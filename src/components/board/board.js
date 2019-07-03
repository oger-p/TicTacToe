import React from 'react';
import Square from '../square/square';
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  getCurrentPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  isGameFinished() {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const { squares } = this.state;

    for (let i = 0; i < winningLines.length; i += 1) {
      const [a, b, c] = winningLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }

  changeCurrentPlayer() {
    const { xIsNext } = this.state;
    this.setState({ xIsNext: !xIsNext });
  }

  handleClick(i) {
    const { squares } = this.state;
    const newSquares = { ...squares };
    if (newSquares[i] || this.isGameFinished()) {
      return;
    }
    newSquares[i] = this.getCurrentPlayer();
    this.changeCurrentPlayer();
    this.setState({ squares: newSquares });
  }

  renderSquare(i) {
    const { squares } = this.state;
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    let status;
    if (this.isGameFinished()) {
      status = `${this.getCurrentPlayer()} a gagné`;
    } else {
      status = `Prochain joueur: ${this.getCurrentPlayer()} `;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
