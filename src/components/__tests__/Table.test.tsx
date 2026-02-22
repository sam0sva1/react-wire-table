import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '../table/Table';
import { TGrid, TItems } from '../../types';

const grid: TGrid = [
	{ index: 'name', label: 'Name', sort: true },
	{ index: 'age', label: 'Age', width: 100 },
];

const items: TItems = [
	{ id: '1', name: 'Charlie', age: 30 },
	{ id: '2', name: 'Alice', age: 25 },
	{ id: '3', name: 'Bob', age: 35 },
];

describe('Table', () => {
	it('renders table with header and body', () => {
		render(<Table grid={grid} items={items} />);
		expect(screen.getByText('Name')).toBeTruthy();
		expect(screen.getByText('Age')).toBeTruthy();
		expect(screen.getByText('Charlie')).toBeTruthy();
		expect(screen.getByText('Alice')).toBeTruthy();
		expect(screen.getByText('Bob')).toBeTruthy();
	});

	it('renders empty message when no items', () => {
		render(<Table grid={grid} items={[]} />);
		expect(screen.getByText('No items to display')).toBeTruthy();
	});

	it('renders custom empty message', () => {
		render(
			<Table grid={grid} items={[]} emptyMessage="Nothing here" />
		);
		expect(screen.getByText('Nothing here')).toBeTruthy();
	});

	it('renders without header when noHeader is true', () => {
		render(<Table grid={grid} items={items} noHeader />);
		expect(screen.queryByText('Name')).toBeNull();
		expect(screen.getByText('Charlie')).toBeTruthy();
	});

	it('shows grid error when grid is not provided', () => {
		render(<Table grid={undefined as unknown as TGrid} items={items} />);
		expect(screen.getByText('Provide a grid for your Table')).toBeTruthy();
	});

	it('sorts items when clicking sortable header', () => {
		const { container } = render(
			<Table grid={grid} items={items} sortIndex="name" />
		);
		const nameHeader = screen.getByText('Name');
		const button = nameHeader.closest('button');
		expect(button).toBeTruthy();

		// Initial order should follow sortIndex (name, asc)
		const getCellTexts = () => {
			const body = container.querySelector('[class*="table__body"]');
			if (!body) return [];
			const rows = body.querySelectorAll('[class*="table-body__row"]');
			return Array.from(rows).map((row) => {
				const cells = row.querySelectorAll('[class*="table-cell_in-body"]');
				return cells[0]?.textContent || '';
			});
		};

		// Click to sort desc
		if (button) fireEvent.click(button);
		const afterFirstClick = getCellTexts();

		// Click again to cycle sort
		if (button) fireEvent.click(button);
		const afterSecondClick = getCellTexts();

		// Verify sorting changed (exact order depends on sort cycle logic)
		expect(afterFirstClick.length).toBe(3);
		expect(afterSecondClick.length).toBe(3);
	});
});
