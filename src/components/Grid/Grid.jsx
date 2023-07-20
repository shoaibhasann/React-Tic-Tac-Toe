import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner";
import "./Grid.css";

function Grid({ numberOfCards }) {
  // State variables for the game board, player turn, and winner
  const [board, setBoard] = useState(Array(numberOfCards).fill(''));
  const [turn, setTurn] = useState(true); // true => O , false => X
  const [winner, setWinner] = useState(null);

  // Function to handle a player's move
  function play(index) {
    // If the game is over or the cell is already filled, return early
    if (winner || board[index]) {
      return;
    }

    // Determine the player's symbol (O or X)
    const playerSymbol = turn ? "O" : "X";

    // Update the board with the player's symbol at the selected index
    const updatedBoard = [...board];
    updatedBoard[index] = playerSymbol;
    setBoard(updatedBoard);

    // Check if the current move results in a win
    const win = isWinner(updatedBoard, playerSymbol);
    if (win) {
      setWinner(playerSymbol); // Set the winner if there's a win
    }

    // Switch the player's turn
    setTurn(!turn);
  }

  // Function to reset the game
  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(''));
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is : {winner}</h1>
          <button className="reset" onClick={reset}>
            Reset
          </button>
        </>
      )}

      {!winner && (
        <h1 className="turn-highlight">Current Turn : {turn ? "O" : "X"}</h1>
      )}

      <div className="grid">
        {/* Map each cell of the board to the Card component */}
        {board.map((el, idx) => (
          <Card
            key={idx}
            gameEnd={!!winner} // Pass the gameEnd prop as true if there's a winner
            onPlay={() => play(idx)} // Pass the play function to the Card component
            player={el}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
