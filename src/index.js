import React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import TodoApp from "./TodoApp";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import "./index.css";

ReactDOM.render(
  <div>
    <Counter />
    <TodoApp />
  </div>,
  document.getElementById("root")
);

registerServiceWorker();
