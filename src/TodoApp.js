import React from "react";
import { connect } from "react-redux";
import { addTodoItem, setVisibilityFilter, toggleTodo } from "./actionCreators";

const Link = ({ active, children, onClickAddTodo }) => {
  // Unstyled text instead of a link for the active filter
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClickAddTodo();
      }}
    >
      {children}
    </a>
  );
};

// Accepts props as the 2nd argument
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClickAddTodo: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

// For functional components, the context is the 2nd argument, after props
let AddTodo = ({ dispatch }) => {
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
          const text = input.value;
          dispatch(addTodoItem(text));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </React.Fragment>
  );
};

// dispatch is injected as a prop to the wrapped component
// if the args to connect are not provided
// The component is also not subscribed to store updates
AddTodo = connect()(AddTodo);

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

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

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

const Footer = ({ store }) => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
