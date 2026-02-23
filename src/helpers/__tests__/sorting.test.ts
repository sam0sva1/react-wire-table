import { describe, it, expect } from 'vitest';
import { prepare, mainSorting, sorter } from '../sorting';

describe('prepare', () => {
	it('returns lowercased string without spaces for string values', () => {
		expect(prepare({ name: 'Hello World' }, 'name')).toBe('helloworld');
	});

	it('returns numeric value as-is', () => {
		expect(prepare({ age: 25 }, 'age')).toBe(25);
	});

	it('returns empty string for missing path', () => {
		expect(prepare({ name: 'Alice' }, 'missing')).toBe('');
	});

	it('removes all whitespace characters', () => {
		expect(prepare({ text: 'a b\tc\nd' }, 'text')).toBe('abcd');
	});
});

describe('mainSorting', () => {
	it('sorts ascending: returns -1 when a < b', () => {
		expect(mainSorting(1, 2, 'asc')).toBe(-1);
	});

	it('sorts ascending: returns 1 when a > b', () => {
		expect(mainSorting(2, 1, 'asc')).toBe(1);
	});

	it('sorts ascending: returns 0 when equal', () => {
		expect(mainSorting(1, 1, 'asc')).toBe(0);
	});

	it('sorts descending: returns 1 when a < b', () => {
		expect(mainSorting(1, 2, 'desc')).toBe(1);
	});

	it('sorts descending: returns -1 when a > b', () => {
		expect(mainSorting(2, 1, 'desc')).toBe(-1);
	});

	it('sorts strings alphabetically ascending', () => {
		expect(mainSorting('apple', 'banana', 'asc')).toBe(-1);
	});

	it('sorts strings alphabetically descending', () => {
		expect(mainSorting('apple', 'banana', 'desc')).toBe(1);
	});
});

describe('sorter', () => {
	const items = [
		{ id: '1', name: 'Charlie', age: 30 },
		{ id: '2', name: 'Alice', age: 25 },
		{ id: '3', name: 'Bob', age: 35 },
	];

	it('sorts items ascending by string field', () => {
		const sorted = sorter([...items], 'name', 'asc');
		expect(sorted.map((i) => i.name)).toEqual(['Alice', 'Bob', 'Charlie']);
	});

	it('sorts items descending by string field', () => {
		const sorted = sorter([...items], 'name', 'desc');
		expect(sorted.map((i) => i.name)).toEqual(['Charlie', 'Bob', 'Alice']);
	});

	it('sorts items ascending by numeric field', () => {
		const sorted = sorter([...items], 'age', 'asc');
		expect(sorted.map((i) => i.age)).toEqual([25, 30, 35]);
	});

	it('sorts items descending by numeric field', () => {
		const sorted = sorter([...items], 'age', 'desc');
		expect(sorted.map((i) => i.age)).toEqual([35, 30, 25]);
	});

	it('handles empty array', () => {
		expect(sorter([], 'name', 'asc')).toEqual([]);
	});

	it('handles single item array', () => {
		const single = [{ id: '1', name: 'Alice' }];
		expect(sorter(single, 'name', 'asc')).toEqual(single);
	});
});
