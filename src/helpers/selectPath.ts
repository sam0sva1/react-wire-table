import { TItem } from '../types';

export function selectPath(
	kit: TItem,
	path: string
): string | number | undefined | null {
	if (typeof path === 'string') {
		const parts = path
			.replace(/\]/g, '')
			.replace(/\[/g, '.')
			.split('.');
		const len = parts.length;

		let temp: unknown = kit;

		for (let i = 0; i < len; i += 1) {
			if (temp && typeof temp === 'object' && parts[i] in temp) {
				temp = (temp as Record<string, unknown>)[parts[i]];
			} else {
				return undefined;
			}
		}

		return temp as string | number | undefined | null;
	}

	return undefined;
}
