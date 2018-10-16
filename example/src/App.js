import React, { Component } from 'react';
import WireTable from 'react-wire-table';


const getGrid = params => [
  {
    index: 'name',
    path: 'info.name',
    label: 'Title',
    width: '25%',
    sort: true,
    render: ({ id, info }) => (
      <a
        onClick={params.onLinkClick}
      >
        #{id} {info.name}
      </a>
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
    render: item => (<div>{item.description}</div>),
  },
];

const items = [
  {
    id: '1',
    description: 'Lil girl',
    info: {
      name: 'Beatrice',
      age: 19,
      created: '23.12.1993',
    },
  },
  {
    id: '2',
    description: 'Man, you know!',
    info: {
      name: 'Vincent',
      age: 51,
      created: '14.02.1991',
    },
  },
  {
    id: '3',
    description: 'Boy. Oh boy!',
    info: {
      name: 'Adolph',
      age: 82,
      created: '23.07.1991',
    },
  },
  {
    id: '4',
    description: 'Gang bang.',
    info: {
      name: 'Guche',
      age: 23,
      created: '01.01.1985',
    },
  },
];

export default class App extends Component {
  render () {

    const params = {
      onLinkClick: (event) => {
        event.preventDefault();
        alert('onLinkClick');
      },
    };

    return (
      <div>
        <WireTable
          items={items}
          grid={getGrid(params)}
          sortIndex={'name'}
          width="100%"
          emptyMessage={(
            <div style={{ fontSize: '0.7em', lineHeight: '1.3em' }}>There are no items yet.</div>
          )}
        />
      </div>
    )
  }
}
