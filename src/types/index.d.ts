import * as React from 'react';

type TReactChild = JSX.Element | React.ReactChild | null | undefined | boolean;
export type TAnyReactChild = TReactChild | TReactChild[] | TReactChild[][];

export type TItem = Record<string, any>;
export type TItems = TItem[];

export interface IGridItem {
  index: string;
  label: string;
  width: number | string;
  path: string;
  processFunc: (value: any) => any,
  placeholder: string,
  headerRender: (item: TItem) => TAnyReactChild,
  render: (item: TItem) => TAnyReactChild,

  classList?: string;

  kit?: string;
  kitConfig?: {
    onCheckboxClick?: (id: string, isChecked: boolean) => ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  };
}

export type TGrid = IGridItem[];