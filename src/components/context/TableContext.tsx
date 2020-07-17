import * as React from 'react';

export interface ITableContext {
}

export interface ITableContextProps {
  context: ITableContext;
}

const defaultValue = {};

export const TableContext = React.createContext<ITableContext>(defaultValue);
const { Consumer } = TableContext;

export function withTableContext<T>(Comp: React.ComponentType): React.FC<Omit<T, 'context'>> {
  return function TableContextWrapper(props) {
    return <Consumer>{(context) => <Comp context={context} {...props} />}</Consumer>;
  };
}
