import React from 'react';
import { classes } from 'classifizer';

import { TableHeaderCell } from '../tableHeaderCell/TableHeaderCell';
import { TItems } from '../../types';
import { TableContext } from '../../context';

export interface ITableHeaderProps {
	items: TItems;
}

export function TableHeader({ items }: ITableHeaderProps) {
	const { grid, classPrefix } = React.useContext(TableContext);

	return (
		<div
			className={classes(
				`${classPrefix}table__header`,
				`${classPrefix}table-header`
			)}
		>
			<div
				className={classes(
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
