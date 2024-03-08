import { useState } from "react";
import { AppState } from "../../enums/AppState";
import "./index.css";
import { GameGrid } from "./components/GameGrid";
import { GameInfo } from "./components/GameInfo";
import useGameFSM from "../../hooks/useGameFSM";
import { GameState } from "../../enums/GameState";
import { Transition } from "./components/Transition";
import { Button } from "@chakra-ui/react";
import countdown from "../../gameSounds/mariostart.mp3";
import success from "../../gameSounds/mk64_firstplace-1.mp3";
import selectplayer from "../../gameSounds/mk64_mario_a09_Cm01NqU.mp3";
import useSound from "use-sound";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

interface LevelDetails {
  gridSize: number;
  numGreenSquares: number;
}

const GameScreen = (props: Prop) => {
  const { setAppState } = props;
  const [beepsfx] = useSound(countdown);
  const [succsfx] = useSound(success);
  const [selectplayersfx] = useSound(selectplayer);

  const Levels: { [key: number]: LevelDetails } = {
    1: { gridSize: 3, numGreenSquares: 3 },
    2: { gridSize: 3, numGreenSquares: 4 },
    3: { gridSize: 4, numGreenSquares: 4 },
    4: { gridSize: 4, numGreenSquares: 5 },
    5: { gridSize: 4, numGreenSquares: 6 },
    6: { gridSize: 5, numGreenSquares: 5 },
    7: { gridSize: 5, numGreenSquares: 6 },
    8: { gridSize: 5, numGreenSquares: 7 },
    9: { gridSize: 6, numGreenSquares: 6 },
    10: { gridSize: 7, numGreenSquares: 7 },
  };
  // Level 1: 3x3 grid, 3 green squares
  // Level 2: 3x3 grid, 4 green squares
  // Level 3: 4x4 grid, 4 green squares
  // Level 4: 4x4 grid, 5 green squares
  // Level 5: 4x4 grid, 6 green squares
  // Level 6: 5x5 grid, 5 green squares
  // Level 7: 5x5 grid, 6 green squares
  // Level 8: 5x5 grid, 7 green squares
  // Level 9: 6x6 grid, 6 green squares
  // Level 10: 7x7 grid, 7 green squares

  const [curLevel, setCurLevel] = useState<number>(1);
  const {
    curState,
    curTime,
    resetGame,
    grids,
    gridSize,
    guessSq,
    greenSquares,
    guessSquares,
    results,
    nextState,
  } = useGameFSM(Levels[curLevel]);

  const NextButton = () => {
    if (curState !== GameState.result) return <></>;
    if (results.wrong + results.missed === 0)
      return (
        <Button
          width="50%"
          onClick={() => {
            if (curLevel === Object.keys(Levels).length - 1) {
              setAppState(AppState.gamesuccess);
              succsfx();
            }
            setCurLevel((prev) => prev + 1);
            resetGame();
            beepsfx();
          }}
        >
          Next Level
        </Button>
      );
    else
      return (
        <Button
          width="50%"
          onClick={() => {
            setAppState(AppState.welcome);
            selectplayersfx();
          }}
        >
          Play Again?
        </Button>
      );
  };

  return (
    <div className="parent">
      {curState !== GameState.transition && (
        <GameInfo curTime={curTime} curState={curState} results={results} />
      )}
      <div className="container">
        {curState === GameState.transition ? (
          <Transition
            curTime={curTime}
            nextState={GameState[nextState]}
            curLevel={curLevel}
          />
        ) : (
          <GameGrid
            curState={curState}
            grids={grids}
            gridSize={gridSize}
            guessSq={guessSq}
            greenSquares={greenSquares}
            guessSquares={guessSquares}
          />
        )}
      </div>
      <div>
        <NextButton />
      </div>
    </div>
  );
};

export { GameScreen };
