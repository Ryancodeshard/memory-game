import React from "react";
import "./index.css"; // Import CSS file for styling
import { AppState } from "../../enums/AppState";

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
