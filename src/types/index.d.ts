import * as React from 'react';

export type TItem = Record<string, any>;
export type TItems = TItem[];

export interface IGridItem {
  index: string;
  label: string;
  width: number | string;
  path: string;
  processFunc: (value: any) => any,
  placeholder: string,
  headerRender: (item: TItem) => React.ReactNode,
  reader: (item: TItem) => React.ReactNode,
}

export type TGrid = IGridItem[];