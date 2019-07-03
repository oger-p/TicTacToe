import React from 'react';
import Square from '../square/square';
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameFinished: false,
      winner: null,
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  componentDidUpdate() {
    const { isGameFinished } = this.state;
    if (!isGameFinished) {
      this.isGameFinished();
    }
  }

  getCurrentPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  getStatus() {
    const { isGameFinished, winner } = this.state;
    let status;
    if (!isGameFinished) {
      status = `Prochain joueur: ${this.getCurrentPlayer()} `;
    } else {
      status = winner ? `${winner} a gagné` : 'Egalité';
    }
    return status;
  }

  isGameFinished() {
    const { squares } = this.state;

    if (Object.values(squares).indexOf(null) === -1) {
      this.setState({ isGameFinished: true, winner: null });
    } else {
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

      for (let i = 0; i < winningLines.length; i += 1) {
        const [a, b, c] = winningLines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[b] === squares[c]
        ) {
          this.setState({ isGameFinished: true, winner: squares[a] });
        }
      }
    }
  }

  changeCurrentPlayer() {
    const { xIsNext } = this.state;
    this.setState({ xIsNext: !xIsNext });
  }

  handleClick(i) {
    const { squares, isGameFinished } = this.state;
    const newSquares = { ...squares };
    if (newSquares[i] || isGameFinished) {
      return;
    }
    newSquares[i] = this.getCurrentPlayer();
    this.setState({ squares: newSquares });
    this.changeCurrentPlayer();
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
    return (
      <div>
        {<div className="status">{this.getStatus()}</div>}
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
