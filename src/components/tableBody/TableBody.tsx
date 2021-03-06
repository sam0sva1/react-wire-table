import * as React from 'react';
import { TableRow } from '../tableRow/TableRow';
import { TItems, TItem, TAnyReactChild } from '../../types';
import { TableContext } from '../../context';

export interface ITableBodyProps {
	items: TItems;
	emptyMessage?: TAnyReactChild;
}

export function TableBody({ items, emptyMessage }: ITableBodyProps) {
	const { classPrefix, stylize } = React.useContext(TableContext);

	if (!items.length) {
		return (
			<div className={stylize(`${classPrefix}table__body`)}>
				<div className={stylize(`${classPrefix}table__empty-message`)}>
					{emptyMessage || 'Нет объектов для отображения'}
				</div>
			</div>
		);
	}

	return (
		<div
			className={stylize(
				`${classPrefix}table__body`,
				`${classPrefix}table-body`
			)}
		>
			{items.map((item: TItem) => (
				<TableRow key={item.id} item={item} />
			))}
		</div>
	);
}
