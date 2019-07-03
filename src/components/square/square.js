import React from 'react';
import './square.css';

function Square(props) {
  const { value, onClick } = props;
  return (
    <button type="button" className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Square;
