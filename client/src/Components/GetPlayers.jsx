import React, { useState } from 'react';
import { RetrieveAll } from './Communications';

export default function GetPlayers() {
  const [players, setPlayers] = useState(false);
  const [persons, setPersons] = useState([]);
  const handleGetPlayers = async () => {
    setPlayers(true);
    setPersons(await RetrieveAll());
  };
  const handleNotGetPlayers = () => {
    setPlayers(false);
  };
  const Lis = () => (

    persons.map((person) => (
      <li key={person.id}>
        {person.name}
        :
        {person.maxpoints}
      </li>
    ))
  );

  return (
    <div>
      {!players && <button id="displayAll" type="button" onClick={handleGetPlayers}>Display all the players</button>}
      {players && (
      <>
        <button type="button" onClick={handleNotGetPlayers}>Stop display all the players</button>
        <ul>
          <Lis />
        </ul>
      </>
      )}
    </div>
  );
}
