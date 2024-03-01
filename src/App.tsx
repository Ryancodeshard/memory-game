import { useState } from "react";
import "./App.css";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AppState } from "./enums/appState";
import { GameScreen } from "./components/GameScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { GameSuccessScreen } from "./components/GameSuccessScreen";

function App() {
  const [appState, setAppState] = useState(AppState.welcome);
  return (
    <div className="App">
      {appState === AppState.welcome ? (
        <WelcomeScreen setAppState={setAppState} />
      ) : appState === AppState.playing ? (
        <GameScreen setAppState={setAppState} />
      ) : appState === AppState.gameover ? (
        <GameOverScreen setAppState={setAppState} />
      ) : appState === AppState.gamesuccess ? (
        <GameSuccessScreen setAppState={setAppState} />
      ) : (
        "Something Went Wrong"
      )}
    </div>
  );
}

export default App;
