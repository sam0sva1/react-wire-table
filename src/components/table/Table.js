import React, { Component } from 'react';

import { Provider } from '../context';
import Body from '../tableBody/TableBody';
import Header from '../tableHeader/TableHeader';


function select(kit, key) {
  if (typeof key === 'string' && key) {
    const parts = key.replace(']', '').replace('[', '.').split('.');
    const len = parts.length;

    let target = kit;

    for (let i = 0; i < len; i += 1) {
      if (typeof target === 'object' && parts[i] in target) {
        target = target[parts[i]];
      } else {
        return undefined;
      }
    }

    return target;
  }

  return undefined;
}

function getComputedWidth(grid) {
  if (grid[grid.length - 1].width === 'auto') {
    return null;
  }

  return grid.reduce((sum, { width }) => {
    const widthType = typeof width;
    if (widthType === 'undefined') return sum;

    if (widthType === 'string') {
      return sum + Number(width.replace(/\D+/g, ''));
    }

    return sum + width;
  }, 0);
}

const prepare = (incoming, field) => {
  const value = select(incoming, field);
  const item = value || incoming;
  return typeof item === 'string' ? item.toLowerCase().replace(' ', '') : item;
};

const mainSorting = (a, b, dir) => {
  if (dir === 'asc') {
    if (a < b) return -1;
    if (a > b) return 1;
  } else {
    if (a < b) return 1;
    if (a > b) return -1;
  }
  return 0;
};

const sorter = (array, field, dir) => array.sort((a, b) => {
  const first = prepare(a, field);
  const second = prepare(b, field);

  return mainSorting(first, second, dir);
});


class Table extends Component {
  constructor(props) {
    super(props);
    const { sortIndex } = props;

    this.state = {
      sortField: sortIndex,
      sortOrder: 'asc',
    };
  }

  changeSort = (newSortField) => {
    const { sortIndex } = this.props;
    let { sortField, sortOrder } = this.state;

    if (newSortField !== sortField) {
      sortOrder = 'asc';
      sortField = newSortField;
    } else if (newSortField === sortField && newSortField !== sortIndex && sortOrder === 'desc') {
      sortField = sortIndex;
      sortOrder = 'asc';
    } else if (newSortField === sortField && sortOrder === 'asc') {
      sortOrder = 'desc';
    } else if (newSortField === sortField && sortOrder === 'desc') {
      sortOrder = 'asc';
    }

    this.setState({ sortField, sortOrder });
  }

  sortItems = (items) => {
    const { sortField, sortOrder } = this.state;
    const { grid } = this.props;

    const column = grid.find(curColumn => curColumn.index === sortField);

    if (sortField && column) {
      return sorter(items, (column.path || sortField), sortOrder);
    }

    return items;
  }

  getContextValue = () => {
    const { sortField, sortOrder } = this.state;
    const { grid, items = [], classPrefix } = this.props;

    const ifNotEmptyPrefix = typeof classPrefix === 'string' ? `${classPrefix}-` : '';

    return {
      grid,
      sorting: {
        sortField,
        sortOrder,
        changeSort: this.changeSort,
        empty: items.length === 0,
      },
      classPrefix: typeof classPrefix === 'undefined' ? 'rwt-' : ifNotEmptyPrefix,
      select,
    };
  }

  render() {
    const {
      items = [], width, grid, emptyMessage,
    } = this.props;

    if (!grid) {
      return (
        <div>
          Provide a grid for Table
        </div>
      );
    }

    const isEmpty = !items.length;
    const computedWidth = getComputedWidth(grid);
    const sortedItems = this.sortItems(items);

    const ifNoWidth = computedWidth ? { width: `${computedWidth}px` } : {};

    const context = this.getContextValue();

    return (
      <Provider value={context}>
        <div
          className={`${context.classPrefix}table${isEmpty ? ` ${context.classPrefix}table_empty` : ''}`}
          style={
            width
              ? { width }
              : ifNoWidth
          }
        >

          <Header {...this.state} grid={grid} items={sortedItems} />
          <Body items={sortedItems} emptyMessage={emptyMessage} />

        </div>
      </Provider>
    );
  }
}

export default Table;
