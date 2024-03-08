import { useState } from "react";
import "./App.css";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AppState } from "./enums/AppState";
import { GameScreen } from "./components/GameScreen";
import { GameSuccessScreen } from "./components/GameSuccessScreen";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [appState, setAppState] = useState(AppState.welcome);
  return (
    <ChakraProvider>
      <div className="App">
        {appState === AppState.welcome ? (
          <WelcomeScreen setAppState={setAppState} />
        ) : appState === AppState.playing ? (
          <GameScreen setAppState={setAppState} />
        ) : appState === AppState.gamesuccess ? (
          <GameSuccessScreen setAppState={setAppState} />
        ) : (
          "Something Went Wrong"
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
