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
    created: '23.12.1993',
    description: 'Lil girl',
  },
  {
    id: '2',
    name: 'Vincent',
    created: '14.02.1991',
    description: 'Man, you know!',
  },
  {
    id: '3',
    name: 'Adolph',
    created: '23.07.1991',
    description: 'Boy. Oh boy!',
  },
  {
    id: '4',
    name: 'Guche',
    created: '01.01.1985',
    description: 'Gang bang.',
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
