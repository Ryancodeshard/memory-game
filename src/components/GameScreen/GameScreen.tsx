import { useEffect, useState } from "react";
import { AppState } from "../../enums/AppState";
import "./index.css";
import { GameGrid } from "./components/GameGrid";
import { GameInfo } from "./components/GameInfo";
import useGameFSM from "../../hooks/useGameFSM";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

interface LevelDetails {
  gridSize: number;
  numGreenSquares: number;
}

const GameScreen = (props: Prop) => {
  const { setAppState } = props;

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
  const { gridSize, numGreenSquares } = Levels[curLevel];
  const { curState, curTime, resetGame } = useGameFSM();

  return (
    <div>
      <GameInfo curTime={curTime} curState={curState} />
      <button onClick={() => setAppState(AppState.gameover)}>Game over</button>
      <button
        onClick={() => {
          setCurLevel((prev) => prev + 1);
          resetGame();
        }}
      >
        Next Level
      </button>
      <div className="container">
        <GameGrid
          curState={curState}
          gridSize={gridSize}
          numGreenSquares={numGreenSquares}
        />
      </div>
    </div>
  );
};

export { GameScreen };
