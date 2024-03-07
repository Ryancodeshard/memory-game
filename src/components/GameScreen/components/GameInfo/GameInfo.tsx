import { useEffect, useState } from "react";
import { GameState } from "../../../../enums/GameState";

interface Prop {
  curTime: number;
  curState: GameState;
}

const GameInfo = (props: Prop) => {
  const { curTime, curState } = props;

  return (
    <>
      <div>{curTime}</div>
      <div>{GameState[curState]}</div>
    </>
  );
};

export { GameInfo };
