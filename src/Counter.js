import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { store } = this.context;
    // Force re-render on store updates
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    // Clean up the subscription to the redux store
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (
      <React.Fragment>
        <h1> {state.counter}</h1>
        <button
          onClick={() => {
            store.dispatch({ type: "INCREMENT" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: "DECREMENT" });
          }}
        >
          -
        </button>
      </React.Fragment>
    );
  }
}

export default Counter;
