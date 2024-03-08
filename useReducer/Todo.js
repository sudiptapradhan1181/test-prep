import { ACTIONS } from "./src/App";

const Todo = ({ todo, dispatch }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ color: todo.completed ? "green" : "red" }}>{todo.name}</div>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.TOGGLE_TODO,
            payload: { ...todo, id: todo.id },
          })
        }
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { ...todo, id: todo.id },
          })
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
