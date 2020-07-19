import * as React from 'react';
import { Icon } from '../tableIcon';

export function getDirectionPic(name: string, sortField: string, sortDirection: string) {
  if (sortField === name && sortDirection === 'asc') {
    return <Icon type="arrow_up" fill="#ffffff" />;
  }

  if (sortField === name && sortDirection === 'desc') {
    return <Icon type="arrow_down" fill="#ffffff" />;
  }

  return <Icon type="unfold_more" fill="#8d9aa7" />;
};

export function getClassLine(index: string, sort: boolean = false, sortField: string, sortDirection: string, prefix: string) {
  let classes = `${prefix}table-row__cell ${prefix}table-cell ${prefix}table-cell_in-header ${prefix}table-cell_${index}`;

  if (sort) {
    classes = `${classes} ${prefix}cell_sortable`;
  }

  if (sortField && sortDirection && sortField === index) {
    classes = `${classes} ${prefix}cell_sorted`;
  }

  return classes;
};