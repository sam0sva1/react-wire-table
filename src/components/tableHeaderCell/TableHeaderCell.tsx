import * as React from 'react';
import { classes } from 'classifizer';

import { CSSProperties } from 'react';
import { Kit } from '../tableKit/TableKit';
import { getDirectionPic } from './helpers';
import { TableContext } from '../../context';
import { IGridItem, TItems } from '../../types';

export interface ITableHeaderCellProps {
	source: IGridItem;
	items: TItems;
}

export function TableHeaderCell(props: ITableHeaderCellProps) {
	const context = React.useContext(TableContext);
	const {
		sorting: { sortField, sortDirection, changeSort },
		classPrefix,
	} = context;

	const {
		source: { headerRender: HeaderRender, index, label, width, sort, kit },
		items,
	} = props;

	const styles: CSSProperties = {};

	if (width) {
		styles.width = width;
		styles.minWidth = width;
	} else if (!width && kit) {
		styles.width = Kit[kit].width;
		styles.minWidth = Kit[kit].width;
	}

	return React.createElement(
		sort ? 'button' : 'div',
		{
			type: 'button',
			tabIndex: sort ? 0 : -1,
			key: index,
			style: styles,
			className: classes(
				`${classPrefix}table-row__cell`,
				`${classPrefix}table-cell`,
				`${classPrefix}table-cell_in-header`,
				`${classPrefix}table-cell_${index}`,
				sort && `${classPrefix}table-cell_sortable`,
				sortField === index && `${classPrefix}cell_sorted`
			),
			onClick: (event) => {
				event.preventDefault();
				if (sort) changeSort(index);
			},
		},
		HeaderRender ? (
			<HeaderRender source={props.source} context={context} items={items} />
		) : (
			<>
				{label || ' '}
				{sort && getDirectionPic(index, sortField, sortDirection)}
			</>
		)
	);
}
