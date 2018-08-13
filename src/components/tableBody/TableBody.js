import React, { Component } from 'react';
import TableRow from '../tableRow/TableRow';
import { withContext } from '../context/index';


class TableBody extends Component {
  render() {
    const { items, emptyMessage, context } = this.props;
    const { classPrefix } = context;


    if (!items.length) {
      return (
        <div className={`${classPrefix}table__body`}>
          <div className={`${classPrefix}table__empty-message`}>
            {
              emptyMessage || 'Нет объектов для отображения'
            }
          </div>
        </div>
      );
    }

    return (
      <div className={`${classPrefix}table__body ${classPrefix}table-body`}>
        { items.map(one => <TableRow key={one.id} item={one} />) }
      </div>
    );
  }
}

export default withContext(TableBody);
