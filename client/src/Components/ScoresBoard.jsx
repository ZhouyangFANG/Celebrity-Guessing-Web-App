import React from 'react';
import GetLeaders from './GetLeaders';
import Scores from './Scores';
import GetPlayers from './GetPlayers';

export default function ScoresBoard(props) {
  const {
    name, currentScore, setLogin, setDeleted,
  } = props;
  return (
    <div>
      <Scores name={name} currentScore={currentScore} setDeleted={setDeleted} setLogin={setLogin} />
      <GetLeaders />
      <GetPlayers />
    </div>
  );
}
