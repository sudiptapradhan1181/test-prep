import { useEffect, useState } from "react";

function debouncePoly(fn, delay) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedVal;
};

export default function App() {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const debouncedVal = useDebounce(value, 1000);

  //Enable for value hook
  // useEffect(() => {
  //   handleInputChange(debouncedVal);
  // }, [debouncedVal]);

  const handleInputChange = (val) => {
    const validInput = val.replace(/[^a-zA-Z ]/g, "");
    const output = validInput
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    console.log(output, "here");
    setValue(output); //change this to setDisplayValue for value hook
  };

  const debounceFn = debouncePoly(handleInputChange, 1000);
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <input
        style={{
          border: "1px solid #000000",
          width: "300px",
        }}
        // value={value} //enable this for value hook
        onChange={(e) => debounceFn(e.target.value)} //change this to setValue for value hook
      />
      <p>Live Input: {value}</p>
      <p>Formatted Value: {displayValue}</p>
    </div>
  );
}
