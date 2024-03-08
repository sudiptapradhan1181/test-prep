import "./styles.css";
import { useState, useReducer } from "react";
import Todo from "../Todo";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return [
        ...todos,
        { name: action.payload.name, id: Date.now(), completed: false },
      ];
    }
    case ACTIONS.TOGGLE_TODO: {
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    }
    case ACTIONS.DELETE_TODO: {
      return todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    }
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo todo={todo} key={todo.id} dispatch={dispatch} />;
      })}
    </div>
  );
}
