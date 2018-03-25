import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Counter from "./Counter";
import TodoApp from "./TodoApp";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Counter />
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
