import { GuessSquare, MemSquare, ResultSquare } from "./Square";
import "./index.css";
import { GameState } from "../../../../enums/GameState";
import { memo, useEffect, useMemo } from "react";

interface Prop {
  curState: GameState;
  grids: number[];
  gridSize: number;
  guessSq: (index: number) => void;
  greenSquares: boolean[];
  guessSquares: Set<number>;
}

const GameGrid = memo((props: Prop) => {
  const { curState, grids, gridSize, guessSq, greenSquares, guessSquares } =
    props;
  const divStyle = {
    gridGap: `${10 - gridSize}`,
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  };

  const Square = (prop: { index: any }) => {
    const { index } = prop;
    return useMemo(() => {
      switch (curState) {
        case GameState.transition:
          return <>This should not appear</>;
        case GameState.guess:
          return (
            <GuessSquare
              isGreen={greenSquares[index]}
              guessSq={() => guessSq(index)}
              isGuessed={guessSquares.has(index)}
            />
          );
        case GameState.memorize:
          return <MemSquare isGreen={greenSquares[index]} />;
        case GameState.result:
          return (
            <ResultSquare
              isGreen={greenSquares[index]}
              isGuessed={guessSquares.has(index)}
            />
          );
      }
    }, [index]);
  };

  // mem->guess (click on green)
  useEffect(() => {
    console.log("State: ", GameState[curState]);
  }, [curState]);

  return (
    <div className="grid" style={divStyle}>
      {grids.map((_, i) => (
        <Square key={i} index={i} />
      ))}
    </div>
  );
});

export { GameGrid };
