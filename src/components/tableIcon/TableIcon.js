import React, { Component } from 'react';

const ArrowDown = props => <svg width={props.width || '24px'} height={props.height || '24px'} viewBox="-6 -3 24 24" xmlns="http://www.w3.org/2000/svg"><title>arrow down</title><g id="Админка" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="5.-Изображения-Конструктор" transform="translate(-1155.000000, -1374.000000)" fill="#C8C8C8"><g id="icons/Down-icon-gray" transform="translate(1149.000000, 1369.000000)"><g id="Down-icon" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "><g id="Group-2" transform="translate(6.000000, 3.000000)"><path d="M7,4.4186624 L7,15 C7,15.5522847 6.55228475,16 6,16 C5.44771525,16 5,15.5522847 5,15 L5,4.41128119 L1.70742143,7.70679199 C1.31707099,8.09749006 0.683906077,8.09777187 0.293208009,7.70742143 C-0.0974900592,7.31707099 -0.0977718692,6.68390608 0.292578569,6.29320801 L5.99523638,0.585471647 L11.7026579,6.29289322 C12.0931822,6.68341751 12.0931822,7.31658249 11.7026579,7.70710678 C11.3121337,8.09763107 10.6789687,8.09763107 10.2884444,7.70710678 L7,4.4186624 Z" id="Combined-Shape" /></g></g></g></g></g></svg>;

const ArrowUp = props => <svg width={props.width || '24px'} height={props.height || '24px'} viewBox="-6 -3 24 24" xmlns="http://www.w3.org/2000/svg"><title>arrow up</title><g id="Админка" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="5.-Изображения-Конструктор" transform="translate(-1155.000000, -1260.000000)" fill="#C8C8C8"><g id="icons/Up-icon-gray" transform="translate(1149.000000, 1257.000000)"><g id="Up-icon"><path d="M13,7.4186624 L13,18 C13,18.5522847 12.5522847,19 12,19 C11.4477153,19 11,18.5522847 11,18 L11,7.41128119 L7.70742143,10.706792 C7.31707099,11.0974901 6.68390608,11.0977719 6.29320801,10.7074214 C5.90250994,10.317071 5.90222813,9.68390608 6.29257857,9.29320801 L11.9952364,3.58547165 L17.7026579,9.29289322 C18.0931822,9.68341751 18.0931822,10.3165825 17.7026579,10.7071068 C17.3121337,11.0976311 16.6789687,11.0976311 16.2884444,10.7071068 L13,7.4186624 Z" id="Combined-Shape" /></g></g></g></g></svg>;

const UnfoldMore = props => <svg width={props.width || '24px'} height={props.height || '24px'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>unfold more</title><g id="Symbols" fill="none" fillRule="evenodd"><g id="unfold-more" fill={props.fill || '#111D2E'}><g id="Combined-Shape"><path d="M13.89 14.475l-1.82 1.818-1.817-1.818c-.586-.586-1.535-.586-2.12 0-.587.586-.587 1.535 0 2.12l2.877 2.88c.586.586 1.536.586 2.122 0l2.878-2.88c.586-.585.586-1.534 0-2.12-.585-.586-1.535-.586-2.12 0zm0-4.88c.585.587 1.535.587 2.12 0 .586-.585.586-1.534 0-2.12l-2.878-2.88c-.586-.585-1.536-.585-2.122 0l-2.878 2.88c-.586.586-.586 1.535 0 2.12.586.587 1.535.587 2.12 0l1.82-1.817 1.817 1.818z" /></g></g></g></svg>;

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
