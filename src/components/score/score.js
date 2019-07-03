import React from 'react';
import './score.css';

function Score(props) {
  const { scoreX, scoreO } = props;
  return (
    <div className="score">
      <span className="score-row">Joueur X : {scoreX}</span>
      <span className="score-row">Joueur O : {scoreO}</span>
    </div>
  );
}

export default Score;
