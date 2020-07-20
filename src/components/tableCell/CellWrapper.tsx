import React from 'react';
import { classes } from 'classifizer';

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
		source: { index, width, classList },
	} = props;

	return (
		<div
			style={width ? { width, minWidth: width } : {}}
			className={classes(
				`${classPrefix}table-row__cell`,
				`${classPrefix}table-cell`,
				sorting.sortField === index && `${classPrefix}table-cell_sorted`,
				`${classPrefix}table-cell_in-body`,
				`${classPrefix}table-cell_${index}`,
				classList
			)}
		>
			{children}
		</div>
	);
}
