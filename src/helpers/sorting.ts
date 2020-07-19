import { selectPath } from './selectPath';
import { TItem, TItems } from '../types';

export function prepare(draft: TItem, field: string): string | number {
	const value = selectPath(draft, field);
	const item = value || JSON.stringify(draft);
	return typeof item !== 'undefined' && typeof item === 'string'
		? (item as string).toLowerCase().replace(' ', '')
		: item;
}

export function mainSorting(
	a: string | number,
	b: string | number,
	direction: string
) {
	if (direction === 'asc') {
		if (a < b) return -1;
		if (a > b) return 1;
	} else {
		if (a < b) return 1;
		if (a > b) return -1;
	}

	return 0;
}

export function sorter(items: TItems, field: string, direction: string) {
	return items.sort(function innerSorter(a: TItem, b: TItem) {
		const first = prepare(a, field);
		const second = prepare(b, field);

		return mainSorting(first, second, direction);
	});
}
