import { TGrid } from '../types';

export function getComputedWidth(grid: TGrid) {
	const autoWidth = grid.find((souce) => souce.width === 'auto');

	if (autoWidth) {
		return undefined;
	}

	return grid.reduce((accum: number, { width }) => {
		const widthType = typeof width;

		if (widthType === 'undefined') {
			return accum;
		}

		if (widthType === 'string') {
			return accum + Number((width as string).replace(/\D+/g, ''));
		}

		return accum + (width as number);
	}, 0);
}
