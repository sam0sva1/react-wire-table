import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHeaderCell from '../tableHeaderCell/TableHeaderCell';

class TableHeader extends Component {
  render() {
    const { items, grid } = this.props;

    return (
      <div className="rwt-table__header rwt-header">
        <div className="rwt-header__row rwt-row">
          { grid.map(col => <TableHeaderCell key={col.index} {...col} items={items} />) }
        </div>
      </div>
    );
  }
}

export default TableHeader;
