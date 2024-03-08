import "./styles.css";
import { useState } from "react";

const data = [
  {
    title: "Accordion 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "Accordion 2",
    description:
      "An accordion is a lightweight container that may either be used standalone, or be connected to a larger surface, such as a card.",
  },
];

export default function App() {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleAccordionItemClick = (id) => {
    setActiveCardId(id === activeCardId ? null : id);
  };

  return (
    <div className="App">
      <div className="accordionContainer">
        {data.map((item, idx) => {
          return (
            <div
              key={item.title}
              className="accordionItem"
              onClick={() => handleAccordionItemClick(idx)}
            >
              <div className="accordionTitle">
                {item.title}
                <span>{idx === activeCardId ? "-" : "+"}</span>
              </div>
              {idx === activeCardId ? (
                <div className="accordionDesc">{item.description}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
