import React, { useState } from 'react';
import {
  RetrieveAll, Post, Update, Delete, GetTop,
} from './Communications';
import GetPlayers from './GetPlayers';
import GetLeaders from './GetLeaders';

export default function Scores(props) {
  const {
    name, currentScore, setDeleted, setLogin,
  } = props;
  const [highestScore, setHighestScore] = useState(0);
  const [bestScore, setBestScore] = useState(currentScore);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);

  const handleShow = async () => {
    const top1 = await GetTop(1);
    setHighestScore(Math.max(currentScore, top1[0].maxpoints));

    const players = await RetrieveAll();
    if (players.some((player) => player.name === name)) {
      Object.values(players).forEach((player) => {
        if (player.name === name) {
          setId(player.id);
          const s = Math.max(currentScore, player.maxpoints);
          setBestScore(s);
          const input = {};
          input.name = name;
          input.points = currentScore;
          input.maxpoints = s;
          Update(player.id, input);
        }
      });
    } else {
      const input = {};
      input.name = name;
      input.points = currentScore;
      input.maxpoints = currentScore;
      // axios.post(`${url}/player`, input)
      //   .then((res) => {
      //     setId(res.data.id);
      //   });
      Post(input, setId);
    }
    setShow(true);
  };

  const handleDelete = () => {
    // axios.delete(`${url}/player/${id}`);
    Delete(id);
    setDeleted(true);
    setLogin(false);
  };

  return (
    <>
      {!show && <button id="showScores" type="button" onClick={handleShow}>Show Scores</button>}
      {show && (
        <>
          <button id="deleteInfo" type="button" onClick={handleDelete}>Delete Account</button>
          <h4 data-testid="info">
            Your Account:
            {name}
            <br />
            Your Current Score:
            {currentScore}
            <br />
            Your Best Score:
            {bestScore}
            <br />
            Best Among All Players:
            {highestScore}
          </h4>
          <GetLeaders />
          <GetPlayers />
        </>
      )}
    </>
  );
}
