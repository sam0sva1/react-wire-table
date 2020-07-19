import React from 'react';

export interface IUnfoldMoreProps {
  width?: number;
  height?: number;
  fill?: string;
}

export function UnfoldMore({ width, height, fill }: IUnfoldMoreProps) {
  return (
    <svg width={width || '24px'} height={height || '24px'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill || '#111D2E'} d="M13.89 14.475l-1.82 1.818-1.817-1.818a1.498 1.498 0 0 0-2.12 0 1.496 1.496 0 0 0 0 2.12l2.877 2.88a1.5 1.5 0 0 0 2.122 0l2.878-2.88a1.498 1.498 0 1 0-2.12-2.12zm0-4.88a1.496 1.496 0 0 0 2.12 0 1.498 1.498 0 0 0 0-2.12l-2.878-2.88a1.502 1.502 0 0 0-2.122 0l-2.878 2.88a1.498 1.498 0 0 0 0 2.12 1.496 1.496 0 0 0 2.12 0l1.82-1.817 1.817 1.818z" />
    </svg>
  );
}
