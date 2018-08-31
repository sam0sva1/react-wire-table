import React from 'react';

import Checkbox from '../tableCheckbox/TableCheckbox';


function SelectionCell(props) {
  const {
    item: { selected, id },
    source: {
      width,
      classList,
      config: {
        onClick = () => {},
      },
    },
    context: {
      classPrefix,
    },
  } = props;
  const defaultWidth = `${SelectionCell.width}px`;

  return (
    <div
      style={width ? { width, minWidth: width } : { width: defaultWidth, minWidth: defaultWidth }}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell ${classPrefix}table-cell_in-body ${classPrefix}table-cell_selection${classList ? ` ${classList}` : ''}`}
    >
      <button type="button" onClick={onClick(id)}>
        <Checkbox checked={selected} />
      </button>
    </div>
  );
}
SelectionCell.width = 40;


export default {
  selection: SelectionCell,
};

export {
  SelectionCell,
};
