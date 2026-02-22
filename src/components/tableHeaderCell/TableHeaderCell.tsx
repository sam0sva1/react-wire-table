import React, { CSSProperties } from 'react';

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
		stylize,
	} = context;

	const {
		source: { headerRender: HeaderRender, index, label, width, sort, kit },
		items,
	} = props;

	const styles: CSSProperties = {};

	if (width) {
		styles.width = width;
		styles.minWidth = width;
	} else if (kit && kit in Kit) {
		styles.width = Kit[kit as keyof typeof Kit].width;
		styles.minWidth = Kit[kit as keyof typeof Kit].width;
	}

	const elementProps: Record<string, unknown> = {
		tabIndex: sort ? 0 : -1,
		key: index,
		style: styles,
		className: stylize(
			`${classPrefix}table-row__cell`,
			`${classPrefix}table-cell`,
			`${classPrefix}table-cell_in-header`,
			`${classPrefix}table-cell_${index}`,
			sort && `${classPrefix}table-cell_sortable`,
			sortField === index && `${classPrefix}cell_sorted`
		),
		onClick: (event: React.MouseEvent) => {
			event.preventDefault();
			if (sort) changeSort(index);
		},
	};

	if (sort) {
		elementProps.type = 'button';
	}

	return React.createElement(
		sort ? 'button' : 'div',
		elementProps,
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
