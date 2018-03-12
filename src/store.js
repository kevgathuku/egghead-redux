import { createStore, combineReducers } from "redux";
import { counter, todos, visibilityFilter } from "./reducer";

const todoApp = combineReducers({
  counter,
  todos,
  visibilityFilter
});

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
