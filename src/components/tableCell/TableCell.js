import React from 'react';

import Kit from '../tableKit/TableKit';
import { withContext } from '../context';

const getEmptyCells = (item, { width }, prefix) => {
  const cells = [];
  for (let i = 0; i < 3; i + 1) {
    cells.push(
      <div
        style={width ? { width, minWidth: width } : {}}
        className={`${prefix}row__cell ${prefix}cell ${prefix}cell_empty`}
      />,
    );
  }
  return cells;
};

const getCells = (item, grid, context) => grid.map((source) => {
  const { kit, render, index } = source;
  if (kit) {
    if (Kit[kit]) {
      const Component = Kit[kit];
      return <Component key={`${index}${item.id}`} item={item} source={source} />;
    }
  } else if (render) {
    return (
      <Wrapper key={`${index}${item.id}`} {...source}>
        {render(item)}
      </Wrapper>
    );
  }

  return <TableCell key={`${index}${item.id}`} item={item} {...source} />;
});

const TableCell = withContext((props) => {
  const {
    item, index, width, classList, context,
  } = props;
  const { sorting, classPrefix } = context;
  const isSorted = sorting.sortField === index ? ` ${classPrefix}cell_sorted` : '';

  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { item[index] || '' }
    </div>
  );
});

const Wrapper = withContext((props) => {
  const {
    itemId, index, width, children, classList, context,
  } = props;
  const { sorting, classPrefix } = context;
  const isSorted = sorting.sortField === index ? ` ${classPrefix}table-cell_sorted` : '';
  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { children }
    </div>
  );
});

export {
  getCells,
  getEmptyCells,
};
