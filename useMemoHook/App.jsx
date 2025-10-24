import { useEffect, useMemo, useRef, useState } from "react";

function areEqualRefs(prevDeps, nextDeps) {
  if (!prevDeps) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }

  return true;
}

const useCustomMemo = (cb, deps) => {
  const memoizedRefs = useRef(null);

  if (!memoizedRefs.current || !areEqualRefs(memoizedRefs.current.deps, deps)) {
    memoizedRefs.current = {
      value: cb(),
      deps,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRefs.current = null;
    };
  }, []);

  return memoizedRefs.current.value;
};

export default function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const squaredCounter = () => {
    console.log("expensive...");
    return counter1 * counter1;
  };

  const memoizedSq = useCustomMemo(squaredCounter, [counter1]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <button onClick={() => setCounter1(counter1 + 1)}>
        Increment counter 1: {counter1}
      </button>
      <div>{memoizedSq}</div>
      <button onClick={() => setCounter2(counter2 - 1)}>
        Decrement counter 2: {counter2}
      </button>
    </div>
  );
}
