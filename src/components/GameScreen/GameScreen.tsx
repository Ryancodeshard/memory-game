import { useState } from "react";
import { AppState } from "../../enums/appState";
import "./index.css";
import { GameGrid } from "./components/GameGrid";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

interface LevelDetails {
  gridSize: number;
  numGreenSquares: number;
}

const GameScreen = (props: Prop) => {
  const { setAppState } = props;

  const Levels: { [key: number]: LevelDetails } = {};

  let count = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < i + 2; j++) {
      if (count === 9) continue;
      Levels[count] = {
        gridSize: i + 3,
        numGreenSquares: i + j + 3,
      };
      count++;
    }
  }
  // Level 1: 3x3 grid, 3 green squares
  // Level 2: 3x3 grid, 4 green squares
  // Level 3: 4x4 grid, 4 green squares
  // Level 4: 4x4 grid, 5 green squares
  // Level 5: 4x4 grid, 6 green squares
  // Level 6: 5x5 grid, 5 green squares
  // Level 7: 5x5 grid, 6 green squares

  Levels[8] = { gridSize: 5, numGreenSquares: 7 };
  Levels[9] = { gridSize: 6, numGreenSquares: 6 };
  Levels[10] = { gridSize: 7, numGreenSquares: 7 };

  // Level 8: 5x5 grid, 7 green squares
  // Level 9: 6x6 grid, 6 green squares
  // Level 10: 7x7 grid, 7 green squares

  const [curLevel, setCurLevel] = useState<number>(1);
  const { gridSize, numGreenSquares } = Levels[curLevel];
  const divStyle = {
    gridGap: `${gridSize}`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <>
      <button onClick={() => setAppState(AppState.gameover)}>Game over</button>
      <button onClick={() => setCurLevel((prev) => prev + 1)}>
        Next Level
      </button>
      <div className="container" style={divStyle}>
        <GameGrid gridSize={gridSize} numGreenSquares={numGreenSquares} />
      </div>
    </>
  );
};

export { GameScreen };
