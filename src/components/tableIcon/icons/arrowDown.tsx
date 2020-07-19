import React from 'react';

export interface IArrowDownProps {
	width?: number;
	height?: number;
}

export function ArrowDown({ width, height }: IArrowDownProps) {
	return (
		<svg
			width={width || '24px'}
			height={height || '24px'}
			viewBox="-6 -3 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7 11.581V1a1 1 0 0 0-2 0v10.589L1.707 8.293A1 1 0 1 0 .293 9.707l5.702 5.708 5.708-5.708a1 1 0 0 0-1.415-1.414L7 11.58z"
				fill="#C8C8C8"
			/>
		</svg>
	);
}
