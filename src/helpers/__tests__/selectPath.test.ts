import { describe, it, expect } from 'vitest';
import { selectPath } from '../selectPath';

describe('selectPath', () => {
	it('returns value for a simple key', () => {
		expect(selectPath({ name: 'Alice' }, 'name')).toBe('Alice');
	});

	it('returns value for a nested dot path', () => {
		expect(selectPath({ user: { name: 'Bob' } }, 'user.name')).toBe('Bob');
	});

	it('returns value for a deeply nested path', () => {
		const item = { a: { b: { c: 42 } } };
		expect(selectPath(item, 'a.b.c')).toBe(42);
	});

	it('returns value for bracket notation', () => {
		const item = { users: { 0: { name: 'Eve' } } };
		expect(selectPath(item, 'users[0].name')).toBe('Eve');
	});

	it('handles multiple bracket notations', () => {
		const item = { data: { items: { 0: { tags: { 1: 'important' } } } } };
		expect(selectPath(item, 'data.items[0].tags[1]')).toBe('important');
	});

	it('returns undefined for missing path', () => {
		expect(selectPath({ name: 'Alice' }, 'age')).toBeUndefined();
	});

	it('returns undefined for partially missing nested path', () => {
		expect(selectPath({ user: { name: 'Bob' } }, 'user.age')).toBeUndefined();
	});

	it('returns undefined when traversing through non-object', () => {
		expect(selectPath({ name: 'Alice' }, 'name.first')).toBeUndefined();
	});

	it('returns null values correctly', () => {
		expect(selectPath({ value: null }, 'value')).toBeNull();
	});

	it('returns numeric values correctly', () => {
		expect(selectPath({ count: 0 }, 'count')).toBe(0);
	});

	it('returns empty string correctly', () => {
		expect(selectPath({ text: '' }, 'text')).toBe('');
	});
});
