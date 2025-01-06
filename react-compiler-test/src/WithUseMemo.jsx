import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [names] = useState(["John", "Bob", "Alice", "Charlie"]);

  const sortedNames = (names) => {
    console.log(`Sorting names with usememo ${Math.random()}`);
    return names.toSorted();
  };

  const handleClick = () => {
    setCount((count) => count + 1);
    console.log("prevCount with usememo -> ", count);
  };

  const memoizedSortedNames = useMemo(() => sortedNames(names), [names]);

  return (
    <>
      <div>
        <button onClick={handleClick}>count is {count}</button>
        <div>
          {memoizedSortedNames.map((val) => {
            return <li key={val}>{val}</li>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
