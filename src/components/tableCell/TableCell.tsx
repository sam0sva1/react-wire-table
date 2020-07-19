import React from 'react';

import { TableContext } from '../../context';
import { TItem, IGridItem } from '../../types';

export interface ITableCellProps {
	item: TItem;
	source: IGridItem;
}

export function TableCell(props: ITableCellProps) {
	const {
		item,
		source: { index, path, placeholder, processFunc, width, classList },
	} = props;
	const { sorting, classPrefix, selectPath } = React.useContext(TableContext);

	const isSorted =
		sorting.sortField === index ? ` ${classPrefix}cell_sorted` : '';

	let value = path ? selectPath(item, path) : item[index];

	if (typeof processFunc === 'function') {
		value = processFunc(value);
	}

	if (typeof placeholder !== 'undefined') {
		value = value || placeholder;
	}

	return (
		<div
			style={width ? { width, minWidth: width } : {}}
			className={`${classPrefix}table-row__cell ${classPrefix}table-cell${isSorted} ${classPrefix}table-cell_in-body ${classPrefix}table-cell_${index}${
				classList ? ` ${classList}` : ''
			}`}
		>
			{value || ''}
		</div>
	);
}
