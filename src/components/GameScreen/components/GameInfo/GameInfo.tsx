import { useEffect, useState } from "react";
import { GameState } from "../../../../enums/GameState";

interface Prop {
  curTime: number;
  curState: GameState;
  results: { correct: number; wrong: number; missed: number };
}

const GameInfo = (props: Prop) => {
  const { curTime, curState, results } = props;

  return (
    <>
      {curState === GameState.result ? (
        <div>{`You got ${results.correct} correct, ${results.wrong} wrong and ${results.missed} missed!`}</div>
      ) : (
        <>
          <div>{curTime}</div>
          <div>{GameState[curState]}</div>
        </>
      )}
    </>
  );
};

export { GameInfo };
