import React from 'react';
import { TGrid, TItem } from '../types';

type StylizeArg = string | false | undefined | null | Record<string, unknown>;

export interface ITableContext {
	grid: TGrid;
	sorting: {
		sortField: string | undefined;
		sortDirection: 'asc' | 'desc';
		changeSort(newSortField: string): void;
		isEmpty: boolean;
	};
	classPrefix: string;
	selectPath(kit: TItem, path: string): string | number | undefined | null;
	stylize(...args: StylizeArg[]): string;
}

export interface ITableContextProps {
	context: ITableContext;
}

const defaultValue: ITableContext = {
	grid: [],
	sorting: {
		sortField: '',
		sortDirection: 'asc',
		changeSort: () => undefined,
		isEmpty: true,
	},
	classPrefix: 'rwt-',
	selectPath: (kit, path) => kit[path] as string | number | undefined | null,
	stylize: (...args) => args.filter(Boolean).join(' '),
};

export const TableContext = React.createContext<ITableContext>(defaultValue);
const { Consumer } = TableContext;

export function withTableContext<T extends ITableContextProps>(
	Comp: React.ComponentType<T>
): React.FC<Omit<T, 'context'>> {
	return function TableContextWrapper(props: Omit<T, 'context'>) {
		return (
			<Consumer>{(context) => <Comp {...(props as T)} context={context} />}</Consumer>
		);
	};
}
