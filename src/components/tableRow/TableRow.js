import React from 'react';

import { getCells, getEmptyCells } from '../tableCell/TableCell';
import { withTableContext } from '../../context';


const TableRow = ({ item, context }) => {
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

export default withTableContext(TableRow);
