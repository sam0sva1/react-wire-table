import React from 'react';

import Kit from '../tableKit/TableKit';
import { withTableContext } from '../../context';



function getEmptyCells(item, { width }, prefix) {
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
      const KitComponent = Kit[kit];
      return <KitComponent key={`${index}${item.id}`} item={item} source={source} context={context} />;
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

const TableCell = withTableContext((props) => {
  const {
    item, index, path, placeholder, processFunc, width, classList, context,
  } = props;
  const { sorting, classPrefix, select } = context;
  const isSorted = sorting.sortField === index ? ` ${classPrefix}cell_sorted` : '';

  let value = (path ? select(item, path) : item[index]);

  if (typeof processFunc === 'function') {
    value = processFunc(value);
  }

  if (typeof placeholder !== 'undefined') {
    value = value || placeholder;
  }

  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_in-body ${classPrefix}table-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { value || '' }
    </div>
  );
});

const Wrapper = withTableContext((props) => {
  const {
    itemId, index, width, children, classList, context,
  } = props;

  const { sorting, classPrefix } = context;
  const isSorted = sorting.sortField === index ? ` ${classPrefix}table-cell_sorted` : '';
  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_in-body ${classPrefix}table-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      { children }
    </div>
  );
});

export {
  getCells,
  getEmptyCells,
};
