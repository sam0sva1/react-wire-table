import React from 'react';
import { TableContext } from '../../context';

export interface ICheckboxProps {
  checked: boolean;
}

export function Checkbox({ checked }: ICheckboxProps) {
  const {} = React.useContext(TableContext);

  return (
    <div className={`checkbox-figure checkbox-figure__${checked ? 'checked' : 'unchecked'}`} />
  );
}
