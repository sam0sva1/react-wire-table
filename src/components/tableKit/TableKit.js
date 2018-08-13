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
  } = props;
  const defaultWidth = `${SelectionCell.width}px`;

  return (
    <div
      style={width ? { width, minWidth: width } : { width: defaultWidth, minWidth: defaultWidth }}
      className={`rwt-table__cell rwt-table__cell_selection${classList ? ` ${classList}` : ''}`}
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
