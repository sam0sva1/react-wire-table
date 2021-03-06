import React from 'react';

import { TableHeaderCell } from '../tableHeaderCell/TableHeaderCell';
import { TItems } from '../../types';
import { TableContext } from '../../context';

export interface ITableHeaderProps {
	items: TItems;
}

export function TableHeader({ items }: ITableHeaderProps) {
	const { grid, classPrefix, stylize } = React.useContext(TableContext);

	return (
		<div
			className={stylize(
				`${classPrefix}table__header`,
				`${classPrefix}table-header`
			)}
		>
			<div
				className={stylize(
					`${classPrefix}table-header__row`,
					`${classPrefix}table-row`
				)}
			>
				{grid.map((source, idx) => (
					<TableHeaderCell
						key={source.index || idx}
						source={source}
						items={items}
					/>
				))}
			</div>
		</div>
	);
}
