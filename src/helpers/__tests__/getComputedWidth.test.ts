import { describe, it, expect } from 'vitest';
import { getComputedWidth } from '../getComputedWidth';
import { TGrid } from '../../types';

describe('getComputedWidth', () => {
	it('returns sum of numeric widths', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: 100 },
			{ index: 'b', label: 'B', width: 200 },
		];
		expect(getComputedWidth(grid)).toBe(300);
	});

	it('parses pixel string widths', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: '100px' },
			{ index: 'b', label: 'B', width: '200px' },
		];
		expect(getComputedWidth(grid)).toBe(300);
	});

	it('returns undefined when any column has auto width', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: 100 },
			{ index: 'b', label: 'B', width: 'auto' },
		];
		expect(getComputedWidth(grid)).toBeUndefined();
	});

	it('skips columns without width', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: 100 },
			{ index: 'b', label: 'B' },
			{ index: 'c', label: 'C', width: 50 },
		];
		expect(getComputedWidth(grid)).toBe(150);
	});

	it('skips percentage widths', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: 100 },
			{ index: 'b', label: 'B', width: '50%' },
		];
		expect(getComputedWidth(grid)).toBe(100);
	});

	it('returns 0 for empty grid', () => {
		expect(getComputedWidth([])).toBe(0);
	});

	it('handles mixed width types', () => {
		const grid: TGrid = [
			{ index: 'a', label: 'A', width: 100 },
			{ index: 'b', label: 'B', width: '150px' },
			{ index: 'c', label: 'C' },
		];
		expect(getComputedWidth(grid)).toBe(250);
	});
});
