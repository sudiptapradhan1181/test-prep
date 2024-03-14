import { useState } from "react";
import "./styles.css";

const AutoSuggestion = ({ suggestions }) => {
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleOnChange = (e) => {
    const searchedValue = e.currentTarget.value;
    let filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1
    );

    setFilteredSuggestion(filtered);
    setUserInput(searchedValue);
    setShowSuggestion(true);
  };

  const handleOnClick = (e) => {
    setFilteredSuggestion([]);
    setUserInput(e.currentTarget.innerText);
    setShowSuggestion(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("enter");
    }
    if (e.keyCode === 38) {
      console.log("up");
    }
    if (e.keyCode === 40) {
      console.log("down");
    }
  };

  const suggestionList = () => {
    if (showSuggestion && userInput) {
      if (filteredSuggestion.length) {
        return (
          <ul className="suggestionList">
            {filteredSuggestion.map((suggestion) => {
              return (
                <li key={suggestion} onClick={(e) => handleOnClick(e)}>
                  {" "}
                  {suggestion}{" "}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return <div>No Suggestion found</div>;
      }
    }
  };

  return (
    <>
      <input
        className="input"
        value={userInput}
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {suggestionList()}
    </>
  );
};

export default AutoSuggestion;
