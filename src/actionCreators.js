let nextTodoId = 0;

export const addTodoItem = text => {
  return {
    type: "ADD_TODO",
    text: text.trim() === "" ? "Learning Redux" : text,
    id: nextTodoId++
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter
  };
};

export const toggleTodo = id => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};
