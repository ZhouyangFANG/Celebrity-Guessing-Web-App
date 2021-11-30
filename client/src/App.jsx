import './App.css';
import React, { useState } from 'react';
import Frame from './Components/Frame';

function App() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState(false);
  const [valid, setValid] = useState(true);
  const [deleted, setDeleted] = useState(false);
  // const nameEl = React.useRef(null);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleLogin = () => {
    if (!name.match(/^[a-z0-9]+$/i)) {
      setValid(false);
      setName('');
    } else {
      setLogin(true);
      setDeleted(false);
    }
  };

  return (
    <div>
      <h1>Guess The Celebrity</h1>
      {!login ? (
        <form onSubmit={handleLogin}>
          <h4>Enter Your Name Here</h4>
          <input
            id="input"
            type="text"
            placeholder="username"
            value={name}
            onChange={handleChange}
          />
          <button type="submit" id="start">Start Quiz</button>
        </form>
      ) : (
        <div>
          <Frame name={name} setLogin={setLogin} setDeleted={setDeleted} />
        </div>
      )}
      {!valid && <h4>Invalid User Name!!</h4>}
      {deleted && <h4>Your account was successfully deleted!</h4>}

    </div>
  );
}
export default App;

// const start = document.getElementById("start_quiz");
// const name = document.getElementById("TakerName");
// start.onclick = function() {
//   console.log(name.value);
// }

// <h3>Enter Your Name Below</h3>
//       <input id="TakerName" type="text" placeholder="Enter Your Name Here"/>
//       <br/>
//       <br/>
//       <button type="button" id="start_quiz">Start Quiz {'  >>>'}</button>
