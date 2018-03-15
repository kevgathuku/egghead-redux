import React from "react";
import { connect } from "react-redux";

const mapStateToLinkProps = state => {
  return {
    value: state.counter
  };
};

const mapDispatchToLinkProps = dispatch => {
  return {
    onClickIncrement: () => {
      dispatch({ type: "INCREMENT" });
    },
    onClickDecrement: () => {
      dispatch({ type: "DECREMENT" });
    },
    onClickIncrementAsync: () => {
      dispatch({ type: "INCREMENT_ASYNC" });
    }
  };
};

const Counter = ({
  value,
  onClickIncrement,
  onClickDecrement,
  onClickIncrementAsync
}) => {
  return (
    <React.Fragment>
      <h1>{value}</h1>
      <button onClick={onClickIncrementAsync}>Increment after 1 second</button>
      <button onClick={onClickIncrement}>Increment</button>
      <button onClick={onClickDecrement}>Decrement</button>
    </React.Fragment>
  );
};

const CounterContainer = connect(mapStateToLinkProps, mapDispatchToLinkProps)(
  Counter
);

export default CounterContainer;
