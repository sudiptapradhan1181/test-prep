import React, { useState, useCallback } from "react";

const Child = React.memo(({ count }) => {
  console.log("child rendered");

  return <div>Count: {count}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  console.log("parent rendered");
  return (
    <>
      <Child count={count} />
      <div>Theme: {theme}</div>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle me{" "}
      </button>

      <button onClick={() => setCount((count) => count + 1)}>
        Increase count
      </button>
    </>
  );
};

const ChildCallback = React.memo(({ onClick }) => {
  console.log("child rendered");

  return <button onClick={onClick}>Increase count</button>;
});

const ParentCallback = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
  }, []);
  console.log("parent rendered");
  return (
    <>
      Count: {count}
      <Child onClick={handleClick} />
    </>
  );
};

export default function App() {
  return <Parent />;
}
