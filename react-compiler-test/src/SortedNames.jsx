import React from "react";

const SortedNames = ({ names, sortNames }) => {
  const sortedNames = sortNames(names);

  return (
    <div>
      {sortedNames.map((val) => {
        return <li key={val}>{val}</li>;
      })}
    </div>
  );
};

export default SortedNames;
