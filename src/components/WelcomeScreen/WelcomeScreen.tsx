import React from "react";
import "./WelcomeScreen.css"; // Import CSS file for styling

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Game</h1>
      <div className="rules">
        <h2>Rules:</h2>
        <ul>
          <li>Rule 1: Description of rule 1</li>
          <li>Rule 2: Description of rule 2</li>
          <li>Rule 3: Description of rule 3</li>
          {/* Add more rules as needed */}
        </ul>
      </div>
      <div className="instructions">
        <h2>Instructions:</h2>
        <p>Instructions for playing the game...</p>
      </div>
      <button className="start-button">Start Game</button>
    </div>
  );
};

export { WelcomeScreen };
