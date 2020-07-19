import React from 'react';

import { Checkbox } from '../tableCheckbox/TableCheckbox';
import { TableContext } from '../../context';
import { TItem, IGridItem } from '../../types';


export interface ISelectionCellProps {
  item: TItem;
  source: IGridItem;
}

export function SelectionCell(props: ISelectionCellProps) {
  const {
    item: { selected, id },
    source: {
      width,
      classList,
      kitConfig,
    },
  } = props;

  const { classPrefix } = React.useContext(TableContext);

  const defaultWidth = `${SelectionCell.width}px`;

  return (
    <div
      style={width ? { width, minWidth: width } : { width: defaultWidth, minWidth: defaultWidth }}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell ${classPrefix}table-cell_in-body ${classPrefix}table-cell_selection${classList ? ` ${classList}` : ''}`}
    >
      <button type="button" onClick={kitConfig?.onCheckboxClick?.(id, selected)}>
        <Checkbox checked={selected} />
      </button>
    </div>
  );
}
SelectionCell.width = 40;

export const Kit = {
  selection: SelectionCell,
};
