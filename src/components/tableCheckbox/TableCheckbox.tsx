import React from 'react';
import { classes } from 'classifizer';

export interface ICheckboxProps {
	checked: boolean;
}

export function Checkbox({ checked }: ICheckboxProps) {
	return (
		<div
			className={classes({
				'checkbox-figure': { mod: { checked, unchecked: !checked } },
			})}
		/>
	);
}
