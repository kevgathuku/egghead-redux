import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Counter from "./Counter";
import TodoApp from "./TodoApp";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import "./index.css";

class Provider extends Component {
  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Counter />
    <TodoApp store={store} />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
