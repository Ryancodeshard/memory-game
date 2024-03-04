import shuffle from "./_helper/shuffle";
import { Square } from "./Square";
import "./index.css";
import { GameState } from "../../../../enums/GameState";
import { useEffect, useState } from "react";

interface Prop {
  curState: GameState;
  gridSize: number;
  numGreenSquares: number;
}

const GameGrid = (props: Prop) => {
  const { curState, gridSize, numGreenSquares } = props;

  console.log(curState === GameState.memorize);
  const divStyle = {
    gridGap: `${10 - gridSize}`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  };

  const grids = Array.from({ length: gridSize ** 2 }, (_, i) => i);
  const greens = new Set(shuffle(grids).slice(0, numGreenSquares));
  const [greenSquares, setGreenSquares] = useState(
    Array.from({ length: gridSize ** 2 }, (_, i) => greens.has(i))
  );
  const removeSq = (index: number) => {
    console.log("Removing index", index);
    let gs = greenSquares;
    gs[index] = false;
    setGreenSquares(gs);
    return true;
  };

  useEffect(() => {
    console.log("Cur state", GameState[curState]);
  }, [curState]);

  return (
    <div className="grid" style={divStyle}>
      {grids.map((_, i) => (
        <Square
          key={i}
          index={i}
          isGreen={greenSquares[i]}
          isShown={[GameState.memorize, GameState.result].includes(curState)}
          removeSq={removeSq}
        />
      ))}
    </div>
  );
};

export { GameGrid };
