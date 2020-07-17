import * as React from 'react';

import { TableContext } from '../../context';
import Body from '../tableBody/TableBody';
import Header from '../tableHeader/TableHeader';
import { TItems, TGrid } from '../../types';

import { getComputedWidth, sorter, selectPath } from '../../helpers';

export interface ITableProps {
  sortIndex: string;
  items: TItems;
  classPrefix?: string;
  grid: TGrid;
  width?: number;
  emptyMessage?: string;
  noHeader?: boolean;
  cssModule?: Record<string, string>;
}

export interface ITableState {
  sortField: string;
  sortDirection: 'asc' | 'desc';
}

export class Table extends React.Component<ITableProps, ITableState> {
  constructor(props: ITableProps) {
    super(props);
    const { sortIndex } = props;

    this.state = {
      sortField: sortIndex,
      sortDirection: 'asc',
    };
  }

  public changeSort(newSortField: string) {
    const { sortIndex } = this.props;
    let { sortField, sortDirection } = this.state;

    if (newSortField !== sortField) {
      sortDirection = 'asc';
      sortField = newSortField;
    } else if (newSortField === sortField && newSortField !== sortIndex && sortDirection === 'desc') {
      sortField = sortIndex;
      sortDirection = 'asc';
    } else if (newSortField === sortField && sortDirection === 'asc') {
      sortDirection = 'desc';
    } else if (newSortField === sortField && sortDirection === 'desc') {
      sortDirection = 'asc';
    }

    this.setState({ sortField, sortDirection });
  }

  public sortItems(draftItems: TItems) {
    const items = [...draftItems];
    const { sortField, sortDirection } = this.state;
    const { grid } = this.props;

    const column = grid.find(curColumn => curColumn.index === sortField);

    if (sortField && column) {
      return sorter(items, (column.path || sortField), sortDirection);
    }

    return items;
  }

  public getContextValue() {
    const { sortField, sortDirection } = this.state;
    const { grid, items = [], classPrefix } = this.props;

    const ifNotEmptyPrefix = typeof classPrefix === 'string' ? `${classPrefix}-` : '';

    return {
      grid,
      sorting: {
        sortField,
        sortDirection,
        changeSort: this.changeSort,
        isEmpty: items.length === 0,
      },
      classPrefix: typeof classPrefix === 'undefined' ? 'rwt-' : ifNotEmptyPrefix,
      selectPath,
    };
  }

  public render() {
    const {
      items = [], width, grid, emptyMessage, noHeader,
    } = this.props;

    if (!grid) {
      return (
        <div>
          Provide a grid for your Table
        </div>
      );
    }

    const isEmpty = !items.length;
    const computedWidth = getComputedWidth(grid);
    const sortedItems = this.sortItems(items);

    const ifNoWidth = computedWidth ? { width: `${computedWidth}px` } : {};

    const context = this.getContextValue();

    return (
      <TableContext.Provider value={context}>
        <div
          className={`${context.classPrefix}table${isEmpty ? ` ${context.classPrefix}table_empty` : ''}`}
          style={
            width
              ? { width }
              : ifNoWidth
          }
        >

          { !noHeader && (
            <Header {...this.state} grid={grid} items={sortedItems} />
          )}
          <Body items={sortedItems} emptyMessage={emptyMessage} />

        </div>
      </TableContext.Provider>
    );
  }
}
