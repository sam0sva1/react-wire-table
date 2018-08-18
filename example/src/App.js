import React, { Component } from 'react';
import WireTable from 'react-wire-table';


const getGrid = params => [
  {
    index: 'name',
    label: 'Title',
    width: 150,
    sort: true,
    render: ({ id, name }) => (
      <a
        onClick={params.onLinkClick}
      >
        #{id} {name}
      </a>
    ),
  },
  {
    index: 'created',
    path: 'info.created',
    label: 'Date',
    width: 100,
    sort: true,
  },
  {
    index: 'description',
    label: 'Description',
    width: 200,
    render: item => (<div>{item.description}</div>),
  },
];

const items = [

  {
    id: '1',
    name: 'Beatrice',
    description: 'Lil girl',
    info: {
      created: '23.12.1993',
    },
  },
  {
    id: '2',
    name: 'Vincent',
    description: 'Man, you know!',
    info: {
      created: '14.02.1991',
    },
  },
  {
    id: '3',
    name: 'Adolph',
    description: 'Boy. Oh boy!',
    info: {
      created: '23.07.1991',
    },
  },
  {
    id: '4',
    name: 'Guche',
    description: 'Gang bang.',
    info: {
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

    const isSimple = false;

    return (
      <div>
        <WireTable
          items={items}
          grid={getGrid(params)}
          sortIndex={'name'}
          emptyMessage={(
            <div style={{ fontSize: '0.7em', lineHeight: '1.3em' }}>There are no items yet.</div>
          )}
        />
      </div>
    )
  }
}
