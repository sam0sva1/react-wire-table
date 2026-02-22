import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableBody } from '../tableBody/TableBody';
import { TableContext, ITableContext } from '../../context';
import { TGrid } from '../../types';

const grid: TGrid = [
	{ index: 'name', label: 'Name' },
	{ index: 'age', label: 'Age' },
];

const defaultContext: ITableContext = {
	grid,
	sorting: {
		sortField: undefined,
		sortDirection: 'asc',
		changeSort: () => undefined,
		isEmpty: true,
	},
	classPrefix: 'rwt-',
	selectPath: (item, path) => item[path] as string | number | null | undefined,
	stylize: (...args) => args.filter(Boolean).join(' '),
};

function renderWithContext(ui: React.ReactElement, context = defaultContext) {
	return render(
		<TableContext.Provider value={context}>{ui}</TableContext.Provider>
	);
}

describe('TableBody', () => {
	it('renders empty message when items array is empty', () => {
		renderWithContext(<TableBody items={[]} />);
		expect(screen.getByText('No items to display')).toBeTruthy();
	});

	it('renders custom empty message', () => {
		renderWithContext(
			<TableBody items={[]} emptyMessage="Custom empty" />
		);
		expect(screen.getByText('Custom empty')).toBeTruthy();
	});

	it('renders rows for each item', () => {
		const items = [
			{ id: '1', name: 'Alice', age: 25 },
			{ id: '2', name: 'Bob', age: 30 },
		];
		renderWithContext(<TableBody items={items} />);
		expect(screen.getByText('Alice')).toBeTruthy();
		expect(screen.getByText('Bob')).toBeTruthy();
	});
});
