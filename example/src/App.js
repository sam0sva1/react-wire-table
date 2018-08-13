import React, { Component } from 'react';
import WireTable from 'react-wire-table';


const getGrid = params => [
  {
    index: 'name',
    label: 'Title',
    width: 100,
    render: ({ id, title }) => (
      <a
        onClick={params.onLinkClick}
      >
        #{id} {title}
      </a>
    ),
  },
  {
    index: 'created',
    label: 'Date',
    width: 100,
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
    name: 'Live',
    created: '23.07.1991',
    description: 'Hello Heloo',
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
          emptyMessage={(
            <div style={{ fontSize: '0.7em', lineHeight: '1.3em' }}>There are no items yet.</div>
          )}
        />
      </div>
    )
  }
}
