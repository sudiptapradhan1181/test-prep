import "./styles.css";
import AutoSuggestion from "./AutoSuggestion";

export default function App() {
  return (
    <div className="App">
      <AutoSuggestion
        suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}
      />
    </div>
  );
}
