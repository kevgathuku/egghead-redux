import React from "react";

const Counter = ({ value, onIncrement, onDecrement }) => (
  <React.Fragment>
    <h1> {value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </React.Fragment>
);

export default Counter;
