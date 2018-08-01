import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '../tableRow/TableRow';

class TableBody extends Component {
  render() {
    const { items, emptyMessage } = this.props;

    if (!items.length) {
      return (
        <div className="rwt-table__body">
          <div className="rwt-table__empty-message">
            {
              emptyMessage || 'Нет объектов для отображения'
            }
          </div>
        </div>
      );
    }

    return (
      <div className="rwt-table__body">
        { items.map(one => <TableRow key={one.id} item={one} />) }
      </div>
    );
  }
}

TableBody.contextTypes = {
  grid: PropTypes.array,
};

export default TableBody;
