import './App.css';
import { useState } from 'react';

function Square({value,onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>
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

export default function Board(){

  // The Board component is a functional component that manages the state of the game
  const [square, setSquare] = useState(Array(9).fill(null)); // Initialize the state with an array of null values
  const [isXNext, setIsXNext] = useState(true); // State to track whose turn it is
 
 
  function handleClick(i){

    // If the square is already filled or the game is over, return early
    if (square[i] || calculateWinner(square)) {
      return;
    }

    // This function handles the click event on a square
    const nextSquare = square.slice(); // Create a copy of the current state
    
    if (isXNext) {
      nextSquare[i] = 'X'; // Update the square with 'X'
    }
    else {
      nextSquare[i] = 'O'; // Update the square with 'O'
    }
    setSquare(nextSquare); // Update the state with the new array
    setIsXNext(!isXNext); // Toggle the turn
    
  }

  const winner = calculateWinner(square); // Calculate the winner
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // If there's a winner, display the winner
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O'); // Otherwise, display the next player
  }
  
  return (
    <>
      <div className="status">{status}</div> {/* Display the status */}
      <div className="board-row">
        <Square value={square[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={square[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={square[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
      <Square value={square[3]} onSquareClick={()=>handleClick(3)}/>
      <Square value={square[4]} onSquareClick={()=>handleClick(4)}/>
      <Square value={square[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
      <Square value={square[6]} onSquareClick={()=>handleClick(6)}/>
      <Square value={square[7]} onSquareClick={()=>handleClick(7)}/>
      <Square value={square[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
}
