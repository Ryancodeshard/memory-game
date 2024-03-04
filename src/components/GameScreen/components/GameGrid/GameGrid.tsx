import shuffle from "./_helper/shuffle";
import { Square } from "./Square";
import "./index.css";
import { useState } from "react";

interface Prop {
  gridSize: number;
  numGreenSquares: number;
}

const GameGrid = (props: Prop) => {
  const { gridSize, numGreenSquares } = props;
  const [isShown, setIsShown] = useState(false);
  const divStyle = {
    gridGap: `${10 - gridSize}`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  };

  const grids = Array.from({ length: gridSize ** 2 }, (_, i) => i);
  const greenSquares = new Set(shuffle(grids).slice(0, numGreenSquares));
  return (
    <div className="grid" style={divStyle}>
      {grids.map((_, i) => (
        <Square key={i} isGreen={greenSquares.has(i)} isShown={isShown} />
      ))}
    </div>
  );
};

export { GameGrid };
