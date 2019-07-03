import React from 'react';
import Square from '../square/square';
import Score from '../score/score';
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {
        X: 0,
        O: 0
      },
      isGameFinished: false,
      winner: null,
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  /**
   * Called when the component did update
   */
  componentDidUpdate() {
    const { isGameFinished } = this.state;
    if (!isGameFinished) {
      this.isGameFinished();
    }
  }

  /**
   * It returns the name of the player who have to play
   */
  getCurrentPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  /**
   * It returns the status of the game
   * It can be :
   * - Player {name} must play
   * - Player {name} won
   * - It's a tie
   */
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

  /**
   * It returns the score for a given player name
   * @param {String} playerName the playerName
   * @returns {Number} the score of the player
   */
  getScore(playerName) {
    const { score } = this.state;

    return score[playerName];
  }

  /**
   * Check if the game is finished
   * If it's finished, it set the state isGameFinished at true and the winner.
   * If there is no winned, it set winner to null.
   */
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
          const { score } = this.state;
          score[squares[a]] += 1;
          this.setState({ isGameFinished: true, winner: squares[a], score });
        }
      }
    }
  }

  /**
   * It change the the state of xIsNext to follow which player have to play
   */
  changeCurrentPlayer() {
    const { xIsNext } = this.state;
    this.setState({ xIsNext: !xIsNext });
  }

  /**
   * It's the function which handle the click on a square
   * It test that the square is not empty and that the game is not finished
   * Then it put the correct symbol in the square and change the current player
   * @param {Number} i
   */
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

  /**
   * It reset the board to launch a new game
   */
  reset() {
    this.setState({
      isGameFinished: false,
      winner: null,
      squares: Array(9).fill(null),
      xIsNext: true
    });
  }

  /**
   * It create a square with a given value
   * @param {Number} i it's the value to pass to the Square component
   */
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
        <div className="reset">
          <button onClick={() => this.reset()} type="button">
            Reset
          </button>
        </div>
        <Score scoreX={this.getScore('X')} scoreO={this.getScore('O')} />
      </div>
    );
  }
}

export default Board;
