import { useState } from "react";
import Square from "./square";

const Board = ({ children }) => {
  const [game, setGame] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playAgainCount, setPlayAgainCount] = useState(0);


  const handlePlay = (position) => {
    if (isGameOver) return;
    const newGame = game.map((i, index) => {
      if (index === position) {
        return player ? "X" : "O";
      }
      return i;
    });
    setGame(newGame);
    setPlayer(!player);
    const winner = checkWinner();
    if (winner) {
      setIsGameOver(true);
    }
  };

  const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let i = 0; i < winList.length; i++) {
      const [p1, p2, p3] = winList[i];
      if (game[p1] && game[p1] === game[p2] && game[p2] === game[p3]) {
        return game[p1];
      }
    }
    return null;
  };

  const handleReset = () => {
    handlePlayAgain();
  };

  const handlePlayAgain = () => {
    setGame(Array(9).fill(null));
    setPlayer(true);
    setIsGameOver(false);
    setPlayAgainCount(playAgainCount + 1);
  };

  const squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <Square key={i} value={game[i]} position={i} handlePlay={handlePlay} />
    );
  }
  

  return (
    <>
      <h2>Winner is: {checkWinner()}</h2>
      <div className="grid grid-cols-3 gap-3">{squares}</div>
      
      {isGameOver && (
        <div>
          <h3>Game Over!</h3>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}

      {!isGameOver && checkWinner() && (
        <div>
          <h3>Game Over!</h3>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
      
    </>
  );
};

export default Board;