# react-wire-table

> A table with classes but almost without styles

[![NPM](https://img.shields.io/npm/v/react-wire-table.svg)](https://www.npmjs.com/package/react-wire-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-wire-table
```

## Usage

```jsx
import React, { Component } from 'react'

import WireTable from 'react-wire-table'

const getGrid = params => [
  {
    index: 'title',
    label: 'Название',
    width: 100,
    render: ({ id, title }) => (
      <a
        onClick={params.onLinkClick}
        href="#"
      >
        #{id} {title}
      </a>
    ),
  },
  {
    index: 'created',
    label: 'Дата',
    width: 100,
  },
  {
    index: 'description',
    label: 'Краткое описание',
    width: 200,
    render: item => (<div>{item.description}</div>),
  },
];

const items = [
  {
    id: '1',
    title: 'Live',
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
          sortIndex={'id'}
          updateItem={() => {}}
          changeSort={this.changeSort}
          emptyMessage={(
            isSimple
              ? <div style={{ fontSize: '0.7em', lineHeight: '1.3em' }}>Пока не добавлено ни одного экспоната. Обратите внимание, что внутри данной<br />коллекции вложены другие коллекции, в которых могут быть экспонаты. Перейти к ним<br />можно из меню коллекций.</div>
              : 'Пока не добавлено ни одного экспоната.'
          )}
        />
      </div>
    )
  }
}
```

## License

MIT © [sam0sva1](https://github.com/sam0sva1)
