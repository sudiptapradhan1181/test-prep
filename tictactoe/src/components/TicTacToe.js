import { useRef, useState } from "react";
import "./../styles.css";

const TicTacToe = ({}) => {
  const [data, setData] = useState(Array(9).fill(""));
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const boxRefArr = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) return 0;
    if (count % 2 === 0) {
      e.target.innerHTML = "X";
      const d = data;
      d[num] = "x";
      setData(d);
      setCount(++count);
    } else if (count % 2 !== 0) {
      e.target.innerHTML = "O";
      const d = data;
      d[num] = "o";
      setData(d);
      setCount(++count);
    }
    checkWin();
  };

  const checkWin = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return won(data[a]);
      }
    }
    return null;
  };

  const won = (winner) => {
    titleRef.current.innerHTML = `Winner is ${winner}`;
    setLock(true);
  };

  const handleReset = () => {
    setData(Array(9).fill(""));
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe";
    boxRefArr.map((e) => {
      e.current.innerHTML = "";
    });
  };
  return (
    <>
      <h2 ref={titleRef}>Tic Tac Toe</h2>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default TicTacToe;
