import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [names] = useState(["John", "Bob", "Alice", "Charlie"]);

  const sortedNames = (names) => {
    console.log(`Sorting names ${Math.random()} with compiler`);
    return names.toSorted();
  };

  const handleClick = () => {
    setCount((count) => count + 1);
    console.log("prevCount with compiler -> ", count);
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>count is {count}</button>
        <div>
          {sortedNames(names).map((val) => {
            return <li key={val}>{val}</li>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
