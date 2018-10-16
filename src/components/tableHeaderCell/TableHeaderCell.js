import React, { Component, Fragment } from 'react';

import Icon from '../tableIcon/TableIcon';
import TableKit from '../tableKit/TableKit';
import { withTableContext } from '../context';


const getDirectionPic = (name, sortField, sortOrder) => {
  if (sortField === name && sortOrder === 'asc') {
    return <Icon type="arrow_up" fill="#ffffff" />;
  }

  if (sortField === name && sortOrder === 'desc') {
    return <Icon type="arrow_down" fill="#ffffff" />;
  }

  return <Icon type="unfold_more" fill="#8d9aa7" />;
};

const getClassLine = (index, sort, sortField, sortOrder, prefix) => {
  let classes = `${prefix}table-row__cell ${prefix}table-cell ${prefix}table-cell_in-header ${prefix}table-cell_${index}`;

  if (sort) {
    classes = `${classes} ${prefix}cell_sortable`;
  }

  if (sortField && sortOrder && sortField === index) {
    classes = `${classes} ${prefix}cell_sorted`;
  }

  return classes;
};

const TableHeaderCell = ({ headerRender: HeaderRender, ...props }) => {
  const {
    index, label, width, sort, kit, items, config, context,
  } = props;
  const {
    sorting: {
      sortField, sortOrder, changeSort, empty,
    },
    classPrefix,
  } = context;

  const styles = {};

  if (width) {
    styles.width = width;
    styles.minWidth = width;
  } else if (!width && kit) {
    styles.width = TableKit[kit].width;
    styles.minWidth = TableKit[kit].width;
  }

  return (
    <a
      role="button"
      key={index}
      style={styles}
      className={getClassLine(index, sort, sortField, sortOrder, classPrefix )}
      onClick={(event) => { event.preventDefault(); if (sort) changeSort(index); }}
    >
      {
        HeaderRender
          ? <HeaderRender {...props} items={items} />
          : (
            <Fragment>
              { label || ' ' }
              { (sort && empty)
                ? <Icon type="unfold_more" fill="#8d9aa7" />
                : (sort && sortField && sortOrder) && getDirectionPic(index, sortField, sortOrder)
              }
            </Fragment>
          )
      }
    </a>
  );
};

export default withTableContext(TableHeaderCell);
