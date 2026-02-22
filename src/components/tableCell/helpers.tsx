import React from 'react';

import { Kit } from '../tableKit/TableKit';
import { ITableContext } from '../../context';
import { TItem, IGridItem } from '../../types';
import { CellWrapper } from './CellWrapper';
import { TableCell } from './TableCell';

export function getEmptyCells({ grid, classPrefix, stylize }: ITableContext) {
	return grid.map(({ width, index }: IGridItem) => (
		<div
			key={index}
			style={width ? { width, minWidth: width } : {}}
			className={stylize(
				`${classPrefix}row__cell`,
				`${classPrefix}cell`,
				`${classPrefix}cell_empty`
			)}
		/>
	));
}

export function getCells(item: TItem, { grid }: ITableContext) {
	const id = item.id as string;
	return grid.map((source) => {
		const { kit, render, index } = source;

		if (kit && kit in Kit) {
			const KitComponent = Kit[kit as keyof typeof Kit];

			return (
				<KitComponent key={`${index}${id}`} item={item} source={source} />
			);
		}

		if (render) {
			return (
				<CellWrapper key={`${index}${id}`} source={source}>
					{render(item)}
				</CellWrapper>
			);
		}

		return <TableCell key={`${index}${id}`} item={item} source={source} />;
	});
}
