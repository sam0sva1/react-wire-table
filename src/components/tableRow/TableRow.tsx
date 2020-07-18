import React from 'react';

import { getCells, getEmptyCells } from '../tableCell/TableCell';
import { TableContext } from '../../context';
import { TItem } from '../../types';

export interface ITableRow {
  item: TItem;
}

export function TableRow({ item }: ITableRow) {
  const context = React.useContext(TableContext);
  const { grid, classPrefix } = context;

  if (item.length) {
    return (
      <div
        className={`${classPrefix}table-body__row ${classPrefix}table-row_empty`}
      >
        {getEmptyCells(item, grid, classPrefix)}
      </div>
    );
  }

  return (
    <div
      className={`${classPrefix}table-body__row ${classPrefix}table-row${item.selected ? ` ${classPrefix}table-row_selected` : ''}`}
    >
      {getCells(item, grid, context)}
    </div>
  );
};
