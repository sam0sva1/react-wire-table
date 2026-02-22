import { TGrid } from '../types';

export function getComputedWidth(grid: TGrid) {
	const hasAutoWidth = grid.some((source) => source.width === 'auto');

	if (hasAutoWidth) {
		return undefined;
	}

	return grid.reduce((accum: number, { width }) => {
		if (width === undefined) {
			return accum;
		}

		if (typeof width === 'string') {
			if (width.includes('%')) {
				return accum;
			}
			return accum + Number(width.replace(/\D+/g, ''));
		}

		return accum + width;
	}, 0);
}
