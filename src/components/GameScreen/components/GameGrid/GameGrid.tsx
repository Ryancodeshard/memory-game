import shuffle from "./_helper/shuffle";
import { Square } from "./Square";
import "./index.css";

const GameGrid = (props: { gridSize: number; numGreenSquares: number }) => {
  const { gridSize, numGreenSquares } = props;
  const divStyle = {
    gridGap: `${10 - gridSize}`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  };
  const grids = Array.from({ length: gridSize ** 2 }, (_, i) => i);
  const greenSquares = new Set(shuffle(grids).slice(0, numGreenSquares));
  return (
    <div className="grid" style={divStyle}>
      {grids.map((_, i) => (
        <Square key={i} isGreen={greenSquares.has(i)} />
      ))}
    </div>
  );
};

export { GameGrid };
