import React from 'react';
import PropTypes from 'prop-types';

import { getCells, getEmptyCells } from '../tableCell/TableCell';

const TableRow = ({ item }, { grid }) => {
  if (item.length) {
    return (
      <div
        className="rwt-body__row rwt-row_empty"
      >
        {getEmptyCells(item, grid)}
      </div>
    );
  }

  return (
    <div
      className={`rwt-body__row rwt-row${item.selected ? ' rwt-row_selected' : ''}`}
    >
      {getCells(item, grid)}
    </div>
  );
};

TableRow.contextTypes = {
  grid: PropTypes.array,
};

export default TableRow;
