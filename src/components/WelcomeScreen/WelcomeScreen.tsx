import React from "react";
import "./index.css"; // Import CSS file for styling
import { AppState } from "../../enums/appState";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const WelcomeScreen = (props: Prop) => {
  const { setAppState } = props;

  const instructions = `
    Memorize the locations of the green squares within a given countdown time.\n 
    After the countdown, the green squares will vanish, then, click on the squares where the green ones were located. \n
    Success in remembering all green squares advances to the next level. \n
    Have fun!
  `;

  return (
    <div className="welcome-screen">
      <h1>Welcome to The Memory Game</h1>
      <div className="rules">
        <h2>Rules:</h2>
        <ul>
          <li>Rule 1: Description of rule 1</li>
          <li>Rule 2: Description of rule 2</li>
          <li>Rule 3: Description of rule 3</li>
        </ul>
      </div>
      <div className="instructions">
        <h2>Instructions:</h2>
        <p style={{ whiteSpace: "break-spaces" }}>{instructions}</p>
      </div>
      <button
        onClick={() => setAppState(AppState.playing)}
        className="start-button"
      >
        Start Game
      </button>
    </div>
  );
};

export { WelcomeScreen };
