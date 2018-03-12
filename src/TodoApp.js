import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { store } = this.context;
    // Force re-render on store updates
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    // Clean up the subscription to the redux store
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
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

          dispatch({
            type: "ADD_TODO",
            text: text.trim() === "" ? "Learning Redux" : text,
            id: nextTodoId++
          });
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

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch({
        type: "TOGGLE_TODO",
        id
      });
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

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
