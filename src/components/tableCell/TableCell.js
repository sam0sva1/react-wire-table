import React from 'react';
import PropTypes from 'prop-types';

import Kit from '../tableKit/TableKit';

const getEmptyCells = (item, { width }) => {
  const cells = [];
  for (let i = 0; i < 3; i + 1) {
    cells.push(
      <div
        style={width ? { width, minWidth: width } : {}}
        className="rwt-row__cell rwt-cell rwt-cell_empty"
      />,
    );
  }
  return cells;
};

const getCells = (item, grid) => grid.map((source) => {
  const { kit, render, index } = source;
  if (kit) {
    if (Kit[kit]) {
      const Component = Kit[kit];
      return <Component key={`${index}${item.id}`} item={item} source={source} />;
    }
  } else if (render) {
    return (
      <Wrapper key={`${index}${item.id}`} {...source} >
        {render(item)}
      </Wrapper>
    );
  }

  return <TableCell key={`${index}${item.id}`} item={item} {...source} />;
});

const TableCell = ({ item, index, width, classList }, { sorting }) => {
  const isSorted = sorting.sortField === index ? ' rwt-cell_sorted' : '';
  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`rwt-row__cell rwt-cell${isSorted} rwt-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { item[index] || '' }
    </div>
  );
};

TableCell.contextTypes = {
  sorting: PropTypes.object,
};

const Wrapper = ({ itemId, index, width, children, classList }, { sorting }) => {
  const isSorted = sorting.sortField === index ? ' rwt-cell_sorted' : '';
  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`rwt-row__cell rwt-cell${isSorted} rwt-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { children }
    </div>
  );
};

Wrapper.contextTypes = {
  sorting: PropTypes.object,
};

export {
  getCells,
  getEmptyCells,
};
