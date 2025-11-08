import './new-style.css';
import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  const squareClass = `square ${value?.toLowerCase() || ''} ${isWinning ? 'winner' : ''}`;
  
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveNumber, setMoveNumber] = useState(0);
  const [winningLine, setWinningLine] = useState([]);
  const [gameStatus, setGameStatus] = useState('Next player: X');
 
 
  function handleClick(i) {
    const currentSquares = squares.slice();
    
    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }

    currentSquares[i] = isXNext ? 'X' : 'O';
    const winner = calculateWinner(currentSquares);
    const isDraw = currentSquares.every(square => square !== null);
    
    setSquares(currentSquares);
    setHistory([...history.slice(0, moveNumber + 1), currentSquares]);
    setMoveNumber(moveNumber + 1);
    setIsXNext(!isXNext);

    if (winner) {
      setGameStatus(`Winner: ${winner}`);
    } else if (isDraw) {
      setGameStatus('Game ended in a draw!');
    } else {
      setGameStatus(`Next player: ${!isXNext ? 'X' : 'O'}`);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setHistory([Array(9).fill(null)]);
    setMoveNumber(0);
    setWinningLine([]);
    setGameStatus('Next player: X');
  }

  function jumpTo(move) {
    setMoveNumber(move);
    setSquares(history[move]);
    setIsXNext(move % 2 === 0);
  }

  return (
    <div className="game-container">
      <div className="status">{gameStatus}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinning={winningLine.includes(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinning={winningLine.includes(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinning={winningLine.includes(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinning={winningLine.includes(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinning={winningLine.includes(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinning={winningLine.includes(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinning={winningLine.includes(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinning={winningLine.includes(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinning={winningLine.includes(8)} />
        </div>
      </div>
      <div className="game-info">
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <div className="moves">
          {history.map((_, move) => (
            <button
              key={move}
              className="move-button"
              onClick={() => jumpTo(move)}
            >
              {move === 0 ? 'Go to game start' : `Go to move #${move}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
