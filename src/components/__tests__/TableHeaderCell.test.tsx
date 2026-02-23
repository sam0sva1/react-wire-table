import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeaderCell } from '../tableHeaderCell/TableHeaderCell';
import { TableContext, ITableContext } from '../../context';
import { TGrid, IGridItem } from '../../types';

const grid: TGrid = [
	{ index: 'name', label: 'Name', sort: true },
	{ index: 'age', label: 'Age' },
];

const changeSort = vi.fn();

const defaultContext: ITableContext = {
	grid,
	sorting: {
		sortField: undefined,
		sortDirection: 'asc',
		changeSort,
		isEmpty: false,
	},
	classPrefix: 'rwt-',
	selectPath: (item, path) => item[path] as string | number | null | undefined,
	stylize: (...args) => args.filter(Boolean).join(' '),
};

function renderWithContext(
	source: IGridItem,
	context = defaultContext
) {
	return render(
		<TableContext.Provider value={context}>
			<TableHeaderCell source={source} items={[]} />
		</TableContext.Provider>
	);
}

describe('TableHeaderCell', () => {
	it('renders label text', () => {
		renderWithContext({ index: 'name', label: 'Name', sort: false });
		expect(screen.getByText('Name')).toBeTruthy();
	});

	it('renders as button when sort is true', () => {
		renderWithContext({ index: 'name', label: 'Name', sort: true });
		const button = screen.getByRole('button');
		expect(button).toBeTruthy();
		expect(button.textContent).toContain('Name');
	});

	it('renders as div when sort is false', () => {
		const { container } = renderWithContext({
			index: 'age',
			label: 'Age',
			sort: false,
		});
		expect(screen.queryByRole('button')).toBeNull();
		expect(container.querySelector('div')).toBeTruthy();
	});

	it('calls changeSort on click when sortable', () => {
		changeSort.mockClear();
		renderWithContext({ index: 'name', label: 'Name', sort: true });
		fireEvent.click(screen.getByRole('button'));
		expect(changeSort).toHaveBeenCalledWith('name');
	});

	it('does not call changeSort on click when not sortable', () => {
		changeSort.mockClear();
		const { container } = renderWithContext({
			index: 'age',
			label: 'Age',
			sort: false,
		});
		const div = container.firstChild as HTMLElement;
		fireEvent.click(div);
		expect(changeSort).not.toHaveBeenCalled();
	});

	it('applies width style when provided', () => {
		const { container } = renderWithContext({
			index: 'name',
			label: 'Name',
			sort: false,
			width: 200,
		});
		const el = container.firstChild as HTMLElement;
		expect(el.style.width).toBe('200px');
		expect(el.style.minWidth).toBe('200px');
	});
});
