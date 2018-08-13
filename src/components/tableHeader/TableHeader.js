import React, { Component } from 'react';

import TableHeaderCell from '../tableHeaderCell/TableHeaderCell';
import { withTableContext } from '../context';

class TableHeader extends Component {
  render() {
    const { items, grid, context } = this.props;
    const { classPrefix } = context;

    return (
      <div className={`${classPrefix}table__header ${classPrefix}table-header`}>
        <div className={`${classPrefix}table-header__row ${classPrefix}table-row`}>
          { grid.map(col => <TableHeaderCell key={col.index} {...col} items={items} />) }
        </div>
      </div>
    );
  }
}

export default withTableContext(TableHeader);
