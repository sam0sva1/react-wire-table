import React from 'react';
import { classes } from 'classifizer';

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
	const { sorting, classPrefix, selectPath, stylize } = React.useContext(
		TableContext
	);

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
			className={classes(
				stylize(
					`${classPrefix}table-row__cell`,
					`${classPrefix}table-cell`,
					`${classPrefix}table-cell_in-body`,
					`${classPrefix}table-cell_${index}`,
					sorting.sortField === index && `${classPrefix}table-cell_sorted`
				),
				classList
			)}
		>
			{value || ''}
		</div>
	);
}
