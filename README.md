# react-wire-table

> A table with classes but almost without styles

[![NPM](https://img.shields.io/npm/v/react-wire-table.svg)](https://www.npmjs.com/package/react-wire-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-wire-table
```

## Grid properties
```javascript
{
  index: 'name', // inner column naming and a key to a property if an item is flat
  label: 'Label', // Label for a column
  width: 100, // px
  path: 'path.to.property', // item['path']['to']['property'] if item is not flat
  processFunc: value => `#${value}`, // to process data before display
  placeholder: 'empty', // if no data provided
  headerRender: () => <div>Some data</div>, // custom view for a table column header
  reader: () => <div>Some data</div>, // for complex view of a cell
}
```

## Usage

```jsx
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

```css
.rwt-table {
  display: flex;
  flex-direction: column;
}

.rwt-table__header {

}

.rwt-table-header {
  background-color: rgba(0, 185, 255, 0.1);
}

.rwt-table__body {

}

.rwt-table-body {

}

.rwt-table-header__row {

}

.rwt-table-body__row {

}

.rwt-table-row {
  display: flex;
}

.rwt-table-row__cell {

}

.rwt-table-cell {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.rwt-table-cell_in-header {

}

.rwt-table-cell_in-body {

}
```

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
