import React from 'react';

import { TableContext } from '../../context';
import { TAnyReactChild, IGridItem } from '../../types';

export interface ICellWrapperProps {
  source: IGridItem;
  children?: TAnyReactChild;
}

export function CellWrapper(props: ICellWrapperProps) {
  const { sorting, classPrefix } = React.useContext(TableContext);
  const {
    children,
    source: {
      index, width, classList,
    },
  } = props;

  const isSorted = sorting.sortField === index ? ` ${classPrefix}table-cell_sorted` : '';

  return (
    <div
      style={width ? { width, minWidth: width } : {}}
      className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_in-body ${classPrefix}table-cell_${index}${classList ? ` ${classList}` : ''}`}
    >
      {children}
    </div>
  );
}
