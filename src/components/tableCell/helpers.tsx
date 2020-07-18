import React from 'react';

import { Kit } from '../tableKit/TableKit';
import { ITableContext } from '../../context';
import { TItem, TGrid, IGridItem } from '../../types';
import { CellWrapper } from './CellWrapper';
import { TableCell } from './TableCell';


export function getEmptyCells(item: TItem, { width }: IGridItem, { classPrefix }: ITableContext) {
  const cells = [];
  for (let i = 0; i < 3; i + 1) {
    cells.push(
      <div
        style={width ? { width, minWidth: width } : {}}
        className={`${classPrefix}row__cell ${classPrefix}cell ${classPrefix}cell_empty`}
      />,
    );
  }
  return cells;
};

export function getCells(item: TItem, grid: TGrid, context: ITableContext) {
  return grid.map((source) => {
    const { kit, render, index } = source;

    if (kit && Kit[kit]) {
      const KitComponent = Kit[kit];

      return <KitComponent key={`${index}${item.id}`} item={item} source={source} />;
    }

    if (render) {
      return (
        <CellWrapper key={`${index}${item.id}`} source={source}>
          {render(item)}
        </CellWrapper>
      );
    }

    return <TableCell key={`${index}${item.id}`} item={item} source={source} />;
  });
}
