import { useEffect, useState } from "react";
import { GameState } from "../../../../enums/GameState";

interface Prop {
  curTime: number;
}

const GameInfo = (props: Prop) => {
  const { curTime } = props;
  return (
    <>
      <div>{curTime}</div>
    </>
  );
};

export { GameInfo };
