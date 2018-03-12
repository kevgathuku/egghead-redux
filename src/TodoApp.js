import React, { Component } from "react";

const FilterLink = ({
  filter,
  currentFilter,
  onChangeVisibility,
  children
}) => {
  // Regular text instead of a link for the active filter
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
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
        <TodoList todos={visibleTodos} onTodoClick={toggleTodo} />
        <p>
          Show:{" "}
          <FilterLink
            filter="SHOW_ALL"
            onChangeVisibility={onChangeVisibility}
            currentFilter={visibilityFilter}
          >
            All
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_ACTIVE"
            onChangeVisibility={onChangeVisibility}
            currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_COMPLETED"
            onChangeVisibility={onChangeVisibility}
            currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default TodoApp;
