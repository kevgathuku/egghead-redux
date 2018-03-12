import React, { Component } from "react";

const FilterLink = ({
  filter,
  currentFilter,
  onChangeVisibility,
  children
}) => {
  // Unstyled text instead of a link for the active filter
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

const Footer = ({ onChangeVisibility, visibilityFilter }) => (
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

const TodoApp = ({
  todos,
  visibilityFilter,
  onChangeVisibility,
  onAddTodo,
  toggleTodo
}) => (
  <div>
    <AddTodo onClickAdd={onAddTodo} />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={toggleTodo}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onChangeVisibility={onChangeVisibility}
    />
  </div>
);

export default TodoApp;
