import shuffle from "./_helper/shuffle";
import { Square } from "./Square";

const GameGrid = (props: { gridSize: number; numGreenSquares: number }) => {
  const { gridSize, numGreenSquares } = props;

  const grids = Array.from({ length: gridSize ** 2 }, (_, i) => i);
  const greenSquares = new Set(shuffle(grids).slice(0, numGreenSquares));
  return (
    <>
      {grids.map((_, i) => (
        <Square key={i} isGreen={greenSquares.has(i)} />
      ))}
    </>
  );
};

export { GameGrid };
