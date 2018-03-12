import React, { Component } from "react";

const FilterLink = ({ filter, onChangeVisibility, children }) => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onChangeVisibility(filter);
      }}
    >
      {children}
    </a>
  );
};

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

class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter,
      onChangeVisibility,
      onAddTodo,
      toggleTodo
    } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            onAddTodo(this.input.value);
            this.input.value = "";
          }}
        >
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              onClick={() => {
                toggleTodo(todo.id);
              }}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Show:{" "}
          <FilterLink
            filter="SHOW_ALL"
            onChangeVisibility={onChangeVisibility}
          >
            All
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_ACTIVE"
            onChangeVisibility={onChangeVisibility}
          >
            Active
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_COMPLETED"
            onChangeVisibility={onChangeVisibility}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default TodoApp;
