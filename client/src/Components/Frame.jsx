import React, { useState } from 'react';
import PropTypes from 'prop-types';
import data from './celebrities.json';
import ScoresBoard from './ScoresBoard';

function Frame(props) {
  const { name, setLogin, setDeleted } = props;
  const [questNum, setQestNum] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);
  const questOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const shuffledQuest = questOrder.sort(useMemo(() => (Math.random() - 0.5), []));
  const shuffledQuest = questOrder.sort(() => Math.random() - 0.5);
  // const a = useMemo(questOrder.sort(() => (Math.random() - 0.5)), []);

  function handleCorrect() {
    setQestNum(questNum + 1);
    setCorrectNum(correctNum + 1);
    // console.log(shuffledQuest);
    // console.log(a);
  }
  function handleIncorrect() {
    setQestNum(questNum + 1);
  }
  return (
    <div>
      {questNum < 10 ? (
        <div>
          <img
            src={data[`${shuffledQuest[questNum]}`].image}
            className="image"
            alt="Celebrity"
          />
          <br />
          <button id="a" type="button" onClick={handleCorrect} data-testid="correct">
            {data[`${shuffledQuest[questNum]}`].A}
          </button>
          <br />
          <button type="button" onClick={handleIncorrect}>
            {data[`${shuffledQuest[questNum]}`].B}
          </button>
          <br />
          <button type="button" onClick={handleIncorrect}>
            {data[`${shuffledQuest[questNum]}`].C}
          </button>
          <br />
          <button type="button" onClick={handleIncorrect}>
            {data[`${shuffledQuest[questNum]}`].D}
          </button>
          <h2 data-testid="info">
            Your Current Score:
            {correctNum}
            /
            {questNum}
          </h2>
        </div>
      ) : (
        <ScoresBoard
          name={name}
          currentScore={correctNum}
          setLogin={setLogin}
          setDeleted={setDeleted}
        />
      )}
    </div>
  );
}

Frame.propTypes = {
  name: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired,
  setDeleted: PropTypes.func.isRequired,
};

export default Frame;
