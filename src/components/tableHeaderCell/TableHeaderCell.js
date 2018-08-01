import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Icon from '../tableIcon/TableIcon';
import TableKit from '../tableKit/TableKit';

const getDirectionPic = (name, sortField, sortOrder) => {
  if (sortField === name && sortOrder === 'asc') {
    return <Icon type="arrow_up" fill="#ffffff" />;
  }

  if (sortField === name && sortOrder === 'desc') {
    return <Icon type="arrow_down" fill="#ffffff" />;
  }

  return <Icon type="unfold_more" fill="#8d9aa7" />;
};

const getClassLine = (index, sort, sortField, sortOrder) => {
  let classes = `rwt-row__cell rwt-cell rwt-cell_${index}`;

  if (sort) {
    classes = `${classes} rwt-cell_sortable`;
  }

  if (sortField && sortOrder && sortField === index) {
    classes = `${classes} rwt-cell_sorted`;
  }

  return classes;
};

const TableHeaderCell = ({
  index, label, width, sort, kit, items, headerRender: HeaderRender, config,
}, context) => {
  const {
    sortField, sortOrder, changeSort, empty,
  } = context.sorting;

  const styles = {};

  if (width) {
    styles.width = width;
    styles.minWidth = width;
  } else if (!width && kit) {
    styles.width = TableKit[kit].width;
    styles.minWidth = TableKit[kit].width;
  }

  if (HeaderRender) {
    return (
      <HeaderRender {...config} items={items} />
    );
  }

  return (
    <div
      style={styles}
      className={getClassLine(index, sort, sortField, sortOrder)}
      onClick={() => { if (sort) changeSort(index); }}
    >
      { label || ' ' }
      { (sort && empty)
        ? <Icon type="unfold_more" fill="#8d9aa7" />
        : (sort && sortField && sortOrder) && getDirectionPic(index, sortField, sortOrder)
      }
    </div>
  );
};

TableHeaderCell.contextTypes = {
  grid: PropTypes.array,
  sorting: PropTypes.object,
};

export default TableHeaderCell;
