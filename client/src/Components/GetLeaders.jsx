// import axios from 'axios';
import React, { useState } from 'react';
import { GetTop } from './Communications';

export default function GetLeaders() {
  const [leaders, setLeaders] = useState(false);
  const [persons, setPersons] = useState([]);
  const [num, setNum] = useState(2);

  const Lis = () => (

    persons.map((person) => (
      <li key={person.id}>
        {person.name}
        :
        {person.maxpoints}
      </li>
    ))
  );
  const handleGetLeaders = async () => {
    setLeaders(true);
    setPersons(await GetTop(num));
  };

  const handleNotGetLeaders = () => {
    setLeaders(false);
  };

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <>
      {!leaders && (
        <>
          <h4>Retrieve and display top</h4>
          <input
            type="number"
            placeholder="Number"
            value={num}
            onChange={handleChange}
          />
          <h4>players</h4>
          <button id="displayLeaders" type="submit" onClick={handleGetLeaders}>Display Leaders</button>

        </>
      )}
      {leaders && (
        <>
          <button type="button" onClick={handleNotGetLeaders}>Stop display leaders</button>
          <ul>
            <Lis />
          </ul>
        </>
      )}
    </>
  );
}
