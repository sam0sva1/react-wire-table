import * as React from 'react';
import { TGrid, TItem } from '../types';

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
	selectPath: (kit, path) => kit[path],
};

export const TableContext = React.createContext<ITableContext>(defaultValue);
const { Consumer } = TableContext;

export function withTableContext<T>(
	Comp: React.ComponentType
): React.FC<Omit<T, 'context'>> {
	return function TableContextWrapper(props) {
		return (
			<Consumer>{(context) => <Comp context={context} {...props} />}</Consumer>
		);
	};
}
