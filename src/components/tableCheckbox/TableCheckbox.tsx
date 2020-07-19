import React from 'react';

export interface ICheckboxProps {
	checked: boolean;
}

export function Checkbox({ checked }: ICheckboxProps) {
	return (
		<div
			className={`checkbox-figure checkbox-figure__${
				checked ? 'checked' : 'unchecked'
			}`}
		/>
	);
}
