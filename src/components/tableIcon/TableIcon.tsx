import React from 'react';

import { ArrowDown } from './icons/arrowDown';
import { ArrowUp } from './icons/arrowUp';
import { UnfoldMore } from './icons/unfoldMore';

function getIcon(type: string, props: Pick<IIconProps, 'width' | 'height' | 'fill'>) {
  switch (type) {
    case 'arrow_down':
      return <ArrowDown {...props} />;
    case 'arrow_up':
      return <ArrowUp {...props} />;
    case 'unfold_more':
      return <UnfoldMore {...props} />;
    default:
      return <div />;
  }
}

export interface IIconProps {
  type: string;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;

  width?: number;
  height?: number;
  fill?: string;
}

export function Icon(props: IIconProps) {


  const { onClick, className, type } = props;
  const classes = ['icon'];

  if (className) classes.push(className);

  return (
    <div className={classes.join(' ')} onClick={onClick}>
      {getIcon(type, props)}
    </div>
  );

}
