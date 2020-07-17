import { TGrid } from '../types';

export function getComputedWidth(grid: TGrid) {
  if (grid[grid.length - 1].width === 'auto') {
    return null;
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
