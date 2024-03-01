import { useState } from "react";
import "./App.css";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AppState } from "./enums/appState";
import { GameScreen } from "./components/GameScreen";
import { GameOverScreen } from "./components/GameOverScreen";

function App() {
  const [appState, setAppState] = useState(AppState.welcome);
  return (
    <div className="App">
      {appState === AppState.welcome ? (
        <WelcomeScreen setAppState={setAppState} />
      ) : appState === AppState.playing ? (
        <GameScreen setAppState={setAppState} />
      ) : (
        <GameOverScreen setAppState={setAppState} />
      )}
    </div>
  );
}

export default App;
