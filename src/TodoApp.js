import React, { Component } from "react";
import store from "./store";

let nextTodoId = 0;

const Link = ({ active, children, onClick }) => {
  // Unstyled text instead of a link for the active filter
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    // Force re-render on store updates
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    // Clean up the subscription to the redux store
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter
          });
        }}
      >
        {props.children}
      </Link>
    );
  }
}

const AddTodo = ({ onClickAdd }) => {
  let input;

  return (
    <React.Fragment>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          onClickAdd(input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </React.Fragment>
  );
};

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(item => item.completed);
    case "SHOW_ACTIVE":
      return todos.filter(item => !item.completed);
    default:
      return todos;
  }
};

const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onClickAdd={text => {
        store.dispatch({
          type: "ADD_TODO",
          text: text.trim() === "" ? "Learning Redux" : text,
          id: nextTodoId++
        });
      }}
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={todoId => {
        store.dispatch({
          type: "TOGGLE_TODO",
          id: todoId
        });
      }}
    />
    <Footer />
  </div>
);

export default TodoApp;
