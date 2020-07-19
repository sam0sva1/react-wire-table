import * as React from 'react';

import { Icon } from '../tableIcon/TableIcon';
import { Kit } from '../tableKit/TableKit';
import { getClassLine, getDirectionPic } from './helpers';
import { TableContext } from '../../context';
import { IGridItem, TItems } from '../../types';
import { CSSProperties } from 'react';

export interface ITableHeaderCellProps {
  source: IGridItem;
  items: TItems;
}

export function TableHeaderCell(props: ITableHeaderCellProps) {
  const context = React.useContext(TableContext);
  const {
    sorting: {
      sortField, sortDirection, changeSort, isEmpty,
    },
    classPrefix,
  } = context;

  const {
    source: {
      headerRender: HeaderRender,
      index,
      label,
      width,
      sort,
      kit,
    },
    items,
  } = props;

  const styles: CSSProperties = {};

  if (width) {
    styles.width = width;
    styles.minWidth = width;
  } else if (!width && kit) {
    styles.width = Kit[kit].width;
    styles.minWidth = Kit[kit].width;
  }

  return (
    <a
      role="button"
      key={index}
      style={styles}
      className={getClassLine(index, sort, sortField, sortDirection, classPrefix)}
      onClick={(event) => { event.preventDefault(); if (sort) changeSort(index); }}
    >
      {
        HeaderRender
          ? <HeaderRender source={props.source} context={context} items={items} />
          : (
            <>
              {label || ' '}

              {sort && (
                <>
                  {isEmpty && <Icon type="unfold_more" fill="#8d9aa7" />}
                  {(sortField && sortDirection) && getDirectionPic(index, sortField, sortDirection)}
                </>
              )
              }
            </>
          )
      }
    </a>
  );
};
