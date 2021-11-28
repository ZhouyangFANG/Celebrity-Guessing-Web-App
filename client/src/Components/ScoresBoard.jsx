import React from 'react';
import Scores from './Scores';

export default function ScoresBoard(props) {
  const {
    name, currentScore, setLogin, setDeleted,
  } = props;
  return (
    <div>
      <Scores name={name} currentScore={currentScore} setDeleted={setDeleted} setLogin={setLogin} />
    </div>
  );
}
