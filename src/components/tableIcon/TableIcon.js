import React, { Component } from 'react';

import ArrowDown from './icons/arrowDown';
import ArrowUp from './icons/arrowUp';
import UnfoldMore from './icons/unfoldMore';


class Icon extends Component {
  getIcon(type) {
    switch (type) {
      case 'arrow_down':
        return <ArrowDown {...this.props} />;
      case 'arrow_up':
        return <ArrowUp {...this.props} />;
      case 'unfold_more':
        return <UnfoldMore {...this.props} />;
      default:
        return <div />;
    }
  }

  render() {
    const { onClick, className, type } = this.props;
    const classes = ['icon'];
    if (className) classes.push(className);

    return (
      <div className={classes.join(' ')} onClick={onClick}>
        {this.getIcon(type)}
      </div>
    );
  }
}

export default Icon;
