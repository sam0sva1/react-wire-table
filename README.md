# react-wire-table

> A table with classes but almost without styles

[![NPM](https://img.shields.io/npm/v/react-wire-table.svg)](https://www.npmjs.com/package/react-wire-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

``` bash
npm install --save react-wire-table
```

## Grid properties

``` javascript
{
    // an inner column name and a key to a property if an item is flat
    index: 'name',

    // Label for a column
    label: 'Label',

    // px
    width: 100,

    // inside of the table will perform (item['path']['to']['property']) if an item is not flat
    path: 'path.to.property',

    // to process data before display
    processFunc: value => `#${value}` ,

    // if no data provided
    placeholder: 'empty',

    // custom view for a table column header
    headerRender: () => < div > Some data < /div>,

    // for complex view of a cell
    reader: () => < div > Some data < /div>,
}
```

## Table properties

``` javascript
{
  // an array of each column specifications
  grid: []

  // an array of items to display
  items: []

  // import * as styles from './styles.css'; in a table initialization file
  // cssModules={styles}
  cssModules?: {}

  // If you don't want to provide any header
  noHeader?: true

  // a name of an item field to provide default sorting
  sortIndex?: 'name'

  // to say something if you have an empty array of items
  emptyMessage?: () => <div>NO ITEMS FOR YOU BOY</div>

  // width of the whole table, a table will stretch if not specified
  width: 1200 | '1200px'

  // a prefix to add to all classes
  classPrefix: 'project-'
}
```

## Usage

``` jsx
import React, { Component } from 'react'

import WireTable from 'react-wire-table'

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
    path: 'info.created',
    label: 'Date',
    width: 100,
  },
  {
    index: 'description',
    path: 'info.description',
    label: 'Description',
    width: 200,
    render: item => (<div>{item.description}</div>),
  },
];

const items = [
  {
    id: '1',
    name: 'Live',
    description: 'Hello World',
    info: {
      created: '23.07.1991',
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
          emptyMessage={(
            <div style={{ fontSize: '0.7em', lineHeight: '1.3em' }}>There are no items yet.</div>
          )}
        />
      </div>
    )
  }
}
```

## Base classes

``` css
.rwt-table {
  display: flex;
  flex-direction: column;
}

.rwt-table__header {}

.rwt-table-header {
  background-color: rgba(0, 185, 255, 0.1);
}

.rwt-table__body {}

.rwt-table-body {}

.rwt-table-header__row {}

.rwt-table-body__row {}

.rwt-table-row {
  display: flex;
}

.rwt-table-row__cell {}

.rwt-table-cell {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.rwt-table-cell_in-header {}

button.rwt-table-cell_in-header {}

.rwt-table-cell_in-header .icon {}

.rwt-table-cell_in-body {}
```

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
