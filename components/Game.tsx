import React, { useState } from "react";
import Board from "./Board";

const initializeBoard = () => {
  return Array(5)
    .fill(null)
    .map(() => Array(5).fill(""));
};

const Game: React.FC = () => {
  const [playerBoard, setPlayerBoard] = useState<string[][]>(initializeBoard);
  const [aiBoard, setAiBoard] = useState<string[][]>(initializeBoard);

  const [aiMoves, setAiMoves] = useState<{ row: number; col: number }[]>([]);

  const handlePlayerClick = (row: number, col: number) => {
    if (playerBoard[row][col] !== "") return;

    const newBoard = playerBoard.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? "X" : c))
    );
    setPlayerBoard(newBoard);
    handleAiMove();
  };

  const handleAiMove = () => {
    let row: number, col: number;

    // Find a valid move
    do {
      row = Math.floor(Math.random() * 5);
      col = Math.floor(Math.random() * 5);
    } while (aiMoves.some((move) => move.row === row && move.col === col));

    setAiMoves([...aiMoves, { row, col }]);

    const newBoard = aiBoard.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? "O" : c))
    );
    setAiBoard(newBoard);
  };

  return (
    <div className="game">
      <div className="game-board">
        <h2>Player Board</h2>
        <Board squares={playerBoard} onClick={handlePlayerClick} />
      </div>
      <div className="game-board">
        <h2>AI Board</h2>
        <Board squares={aiBoard} onClick={() => {}} />
      </div>
    </div>
  );
};

export default Game;
