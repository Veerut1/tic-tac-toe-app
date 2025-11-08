import { render, screen, fireEvent } from '@testing-library/react';
import Board from './App';

test('renders board with correct initial status', () => {
  render(<Board />);
  expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
});

test('renders nine squares', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button', { name: '' });
  expect(squares.length).toBe(9);
});

test('clicking on a square updates its value', () => {
  render(<Board />);
  const square = screen.getAllByRole('button')[0];
  fireEvent.click(square);
  expect(square.textContent).toBe('X');
});

test('alternates turns between X and O', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]);
  expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
  fireEvent.click(squares[1]);
  expect(squares[1].textContent).toBe('O');
  expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
});

test('does not allow clicking a filled square', () => {
  render(<Board />);
  const square = screen.getAllByRole('button')[0];
  fireEvent.click(square); // X
  fireEvent.click(square); // Should not change
  expect(square.textContent).toBe('X');
});

test('detects a winner', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X wins
  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
});
