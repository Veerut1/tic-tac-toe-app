import './new-style.css';
import { useState } from 'react';

function Square({ value, onSquareClick, isWinning, isGameOver }) {
  const squareClass = `square ${value?.toLowerCase() || ''} ${isWinning ? 'winner' : ''} ${isGameOver && !isWinning ? 'non-winner' : ''}`;
  
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
      return {
        winner: squares[a],
        line: [a, b, c]
      };
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
    const result = calculateWinner(currentSquares);
    const isDraw = currentSquares.every(square => square !== null);
    
    setSquares(currentSquares);
    setHistory([...history.slice(0, moveNumber + 1), currentSquares]);
    setMoveNumber(moveNumber + 1);
    setIsXNext(!isXNext);

    if (result) {
      setGameStatus(`Winner: ${result.winner}`);
      setWinningLine(result.line);
    } else if (isDraw) {
      setGameStatus('Game ended in a draw!');
      setWinningLine([]);
    } else {
      setGameStatus(`Next player: ${!isXNext ? 'X' : 'O'}`);
      setWinningLine([]);
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
          <Square 
            value={squares[0]} 
            onSquareClick={() => handleClick(0)} 
            isWinning={winningLine.includes(0)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[1]} 
            onSquareClick={() => handleClick(1)} 
            isWinning={winningLine.includes(1)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[2]} 
            onSquareClick={() => handleClick(2)} 
            isWinning={winningLine.includes(2)} 
            isGameOver={winningLine.length > 0}
          />
        </div>
        <div className="board-row">
          <Square 
            value={squares[3]} 
            onSquareClick={() => handleClick(3)} 
            isWinning={winningLine.includes(3)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[4]} 
            onSquareClick={() => handleClick(4)} 
            isWinning={winningLine.includes(4)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[5]} 
            onSquareClick={() => handleClick(5)} 
            isWinning={winningLine.includes(5)} 
            isGameOver={winningLine.length > 0}
          />
        </div>
        <div className="board-row">
          <Square 
            value={squares[6]} 
            onSquareClick={() => handleClick(6)} 
            isWinning={winningLine.includes(6)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[7]} 
            onSquareClick={() => handleClick(7)} 
            isWinning={winningLine.includes(7)} 
            isGameOver={winningLine.length > 0}
          />
          <Square 
            value={squares[8]} 
            onSquareClick={() => handleClick(8)} 
            isWinning={winningLine.includes(8)} 
            isGameOver={winningLine.length > 0}
          />
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
