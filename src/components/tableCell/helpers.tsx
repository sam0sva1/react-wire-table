import React from 'react';

import { Kit } from '../tableKit/TableKit';
import { ITableContext } from '../../context';
import { TItem, IGridItem } from '../../types';
import { CellWrapper } from './CellWrapper';
import { TableCell } from './TableCell';


export function getEmptyCells(item: TItem, { grid, classPrefix }: ITableContext) {
  return grid.map(({ width }: IGridItem) => {
    return (
      <div
        style={width ? { width, minWidth: width } : {}}
        className={`${classPrefix}row__cell ${classPrefix}cell ${classPrefix}cell_empty`}
      />
    );
  });
};

export function getCells(item: TItem, { grid }: ITableContext) {
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