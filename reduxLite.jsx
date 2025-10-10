import React, { useContext, createContext, useReducer } from "react";

const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    default:
      throw new Error(`No action found for type ${action.type}`);
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, { theme: "light" });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Parent = () => {
  const { state, dispatch } = useContext(ThemeContext);
  return (
    <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
      {state.theme}
    </button>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Parent />
    </ThemeProvider>
  );
}
