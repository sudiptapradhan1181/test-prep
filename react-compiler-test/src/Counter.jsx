import React from "react";

const Counter = ({ count, setCount }) => {
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};

export default Counter;
