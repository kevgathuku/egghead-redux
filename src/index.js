import React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import TodoApp from "./TodoApp";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import "./index.css";

const render = () => {
  ReactDOM.render(
    <div>
      <Counter
        value={store.getState().counter}
        onIncrement={() => {
          store.dispatch({ type: "INCREMENT" });
        }}
        onDecrement={() => {
          store.dispatch({ type: "DECREMENT" });
        }}
      />
      <TodoApp
        {...store.getState()}
        toggleTodo={todoId => {
          store.dispatch({
            type: "TOGGLE_TODO",
            id: todoId
          });
        }}
        onChangeVisibility={filter => {
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter
          });
        }}
      />
    </div>,
    document.getElementById("root")
  );
};

store.subscribe(render);
// Render first time
render();

registerServiceWorker();
