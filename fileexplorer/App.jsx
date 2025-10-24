import { useEffect, useRef, useState } from "react";

const explorerData = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    { id: "2", name: "file1", isFolder: false, items: [] },
    {
      id: "3",
      name: "folder1",
      isFolder: true,
      items: [
        {
          id: "4",
          name: "folder2",
          isFolder: true,
          items: [
            {
              id: "5",
              name: "file2",
              isFolder: false,
              items: [],
            },
            { id: "6", name: "file3", isFolder: false, items: [] },
          ],
        },
        { id: "7", name: "file4", isFolder: false, items: [] },
      ],
    },
  ],
};

const useTraverseTree = () => {
  function insertNode(tree, folderId, value, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: value,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    const latestTree = tree.items.map((obj) => {
      return insertNode(obj, folderId, value, isFolder);
    });

    return { ...tree, latestTree };
  }

  return { insertNode };
};

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: null,
  });

  const handleAddFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      isVisible: true,
      isFolder,
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !!e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, isVisible: false });
    }
  };

  if (!explorer.isFolder) {
    return <span className="w-40 bg-gray-200 ml-4">{explorer.name}</span>;
  }

  return (
    <div className="flex flex-col">
      <div className="w-40 bg-gray-200 items-center justify-between flex flex-row">
        <span onClick={() => setExpand(!expand)}>{explorer.name}</span>
        <div className="flex flex-row">
          <button
            className="border-solid border-2 border-black"
            onClick={(e) => handleAddFolder(e, true)}
          >
            Folder +
          </button>
          <button
            className="border-solid border-2 border-black"
            onClick={(e) => handleAddFolder(e, false)}
          >
            File +
          </button>
        </div>
      </div>
      {showInput.isVisible && (
        <div>
          <input
            type="text"
            className="border-solid border-2 border-black"
            autoFocus
            onBlur={() => setShowInput({ ...showInput, isVisible: false })}
            onKeyDown={handleEnter}
          />
        </div>
      )}
      <div style={{ display: expand ? "block" : "none" }}>
        {explorer.items.map((exp) => {
          return <Folder explorer={exp} handleInsertNode={handleInsertNode} />;
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [exploreTree, setExploreTree] = useState(explorerData);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, value, isFolder) => {
    const finalTree = insertNode(exploreTree, folderId, value, isFolder);

    setExploreTree(finalTree);
  };

  return (
    <div className="flex flex-row gap-2">
      <Folder explorer={exploreTree} handleInsertNode={handleInsertNode} />
    </div>
  );
}
