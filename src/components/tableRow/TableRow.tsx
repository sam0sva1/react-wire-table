import React from 'react';

import { TableContext } from '../../context';
import { TItem } from '../../types';
import { getEmptyCells, getCells } from '../tableCell';

export interface ITableRowProps {
	item: TItem;
}

export function TableRow({ item }: ITableRowProps) {
	const context = React.useContext(TableContext);
	const { classPrefix, stylize } = context;

	if (item.isEmpty) {
		return (
			<div
				className={stylize(
					`${classPrefix}table-body__row`,
					`${classPrefix}table-row_empty`
				)}
			>
				{getEmptyCells(context)}
			</div>
		);
	}

	return (
		<div
			className={stylize(
				`${classPrefix}table-body__row`,
				`${classPrefix}table-row`,
				item.selected && `${classPrefix}table-row_selected`
			)}
		>
			{getCells(item, context)}
		</div>
	);
}
