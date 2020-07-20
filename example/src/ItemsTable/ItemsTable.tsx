import * as React from 'react';
import { WireTable } from 'react-wire-table';
// import { WireTable } from '../../../src';

import { getGrid } from './grid';
import { items } from './items';

import * as styles from './ItemsTable.css';

export function ItemsTable() {
  const params = {
    onLinkClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      alert('onLinkClick');
    },
  };

  return (
    <div className={styles['table']}>
      <WireTable
        items={items}
        grid={getGrid(params)}
        width="100%"
        cssModule={{
          'rwt-table': 'rwt-table rwt-table_ololo',
          'rwt-table-cell': 'rwt-table-cell rwt-table-cell_OLOLO'
        }}
        emptyMessage={(
          <div style={{ fontSize: '0.7em', lineHeight: '1.3em', }}>There are no items yet.</div>
        )}
      />
    </div>
  )
}