import * as React from 'react';
import Table from 'react-wire-table';

import { getGrid } from './grid';
import { items } from './items';

export function ItemsTable() {
  const params = {
    onLinkClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      alert('onLinkClick');
    },
  };

  return (
    <div>
      <WireTable
        items={items}
        grid={getGrid(params)}
        sortIndex={'name'}
        width="100%"
        emptyMessage={(
          <div style={{ fontSize: '0.7em', lineHeight: '1.3em', }}>There are no items yet.</div>
        )}
      />
    </div>
  )
}