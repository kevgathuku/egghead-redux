import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import Counter from "./Counter";
import TodoApp from "./TodoApp";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { counter, todos, visibilityFilter } from "./reducer";

let nextTodoId = 0;

const todoApp = combineReducers({
  counter,
  todos,
  visibilityFilter
});
const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
        onAddTodo={text => {
          store.dispatch({
            type: "ADD_TODO",
            text: text.trim() === "" ? "Learning Redux" : text,
            id: nextTodoId++
          });
        }}
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
