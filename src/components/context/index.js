import React, { Component, createContext } from 'react';


const defaultValue = {};

const { Provider, Consumer } = createContext(defaultValue);

const withContext = Comp => class extends Component {
  render() {
    return (
      <Consumer>
        {
          context => <Comp {...this.props} context={context} />
        }
      </Consumer>
    );
  }
};

export {
  Provider,
  Consumer,
  withContext,
};
