import * as React from 'react';
import { IItem, IGridParams } from './types';

export const getGrid = (params: IGridParams) => [
  {
    index: 'name',
    path: 'info.name',
    label: 'Title',
    width: '25%',
    sort: true,
    render: ({ id, info }: IItem) => (
      <button
        onClick={params.onLinkClick}
      >
        #{id} {info.name}
      </button>
    ),
  },
  {
    index: 'age',
    path: 'info.age',
    label: 'Age',
    width: '15%',
    sort: true,
  },
  {
    index: 'created',
    path: 'info.created',
    label: 'Date',
    width: '30%',
    sort: true,
  },
  {
    index: 'description',
    label: 'Description',
    width: '25%',
    render: (item: IItem) => (<div>{item.description}</div>),
  },
];