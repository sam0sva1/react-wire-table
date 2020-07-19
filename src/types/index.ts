import * as React from 'react';
import { ITableContext } from '../context';

type TReactChild = JSX.Element | React.ReactChild | null | undefined | boolean;
export type TAnyReactChild = TReactChild | TReactChild[] | TReactChild[][];

export type TItem = Record<string, any>;
export type TItems = TItem[];

export interface IGridItem {
  isEmpty?: boolean;

  index: string;
  label: string;
  width?: number | string;
  path?: string;
  sort?: boolean;

  placeholder?: string,
  processFunc?: (value: any) => any,
  headerRender?: (props: { source: IGridItem; context: ITableContext; items: TItems }) => React.ReactElement,
  render?: (item: any) => React.ReactElement,

  classList?: string;

  kit?: string;
  kitConfig?: {
    onCheckboxClick?: (id: string, isChecked: boolean) => ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  };
}

export type TGrid = IGridItem[];