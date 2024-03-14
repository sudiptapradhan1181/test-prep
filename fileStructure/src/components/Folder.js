import { useState } from "react";
import "./../styles.css";

const Folder = ({ explorer, handleInsertNode }) => {
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleButtonClick = (e, isFolder) => {
    e.stopPropagation();
    setIsChildVisible(true);
    setShowInput({ visible: true, isFolder: isFolder });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleParentClick = () => {
    setIsChildVisible(!isChildVisible);
  };
  if (explorer.isFolder) {
    return (
      <div className="parent">
        <span className="folder" onClick={handleParentClick}>
          {explorer.isFolder ? "📁 " : "🗒 "}
          {explorer.name}
          <div className="buttonContainer">
            <button onClick={(e) => handleButtonClick(e, true)}>
              Folder +
            </button>
            <button onClick={(e) => handleButtonClick(e, false)}>File +</button>
          </div>
        </span>
        <div
          className="child"
          style={{ display: isChildVisible ? "block" : "none" }}
        >
          {showInput.visible ? (
            <input
              type="text"
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : null}
          {explorer.items?.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <div>🗒 {explorer.name}</div>;
};

export default Folder;
