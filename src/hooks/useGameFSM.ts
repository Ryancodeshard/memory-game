import { useEffect, useState } from "react";
import { GameState } from "../enums/GameState";

const useGameFSM = () => {
  const stateMap = [GameState.transition, GameState.memorize, GameState.transition, GameState.guess, GameState.result];
  const [curStateIndex, setCurStateIndex] = useState<number>(0);
  const [curState, setCurState] = useState<GameState>(stateMap[curStateIndex]);
  const [curTime, setCurTime] = useState<number>(0);
  let interval: NodeJS.Timer;
  let timeout: NodeJS.Timeout;

  const clearTimer = () => {
    if (interval || timeout) {
      clearInterval(interval);
      clearTimeout(timeout)
      console.log("Cleared timer");
    }
  };

  const timer = (time: number) => {
    setCurTime(time);
    interval = setInterval(() => {
      setCurTime((prevCount: number) => prevCount - 1);
    }, 1000);

    // Clear the interval after the specified time
    timeout = setTimeout(() => {
      clearTimer();
      nextState();
    }, time * 1000);
  };

  const nextState = () => {
    setCurStateIndex((prev) => prev + 1);
  };

  const resetGame = () => {
    clearTimer();
    setCurStateIndex(0);
  };

  useEffect(() => {
    if (curStateIndex !== -1 && curStateIndex < stateMap.length) {
      setCurState(stateMap[curStateIndex]);
    } else {
      console.log("Level Over");
    }
  }, [curStateIndex, stateMap]);

  useEffect(() => {
    switch (curState) {
      case GameState.transition:
        timer(3);
        break;
      case GameState.guess:
      case GameState.memorize:
        timer(10);
        break;
      case GameState.result:
        break;
    }
    // Clean up the interval on unmount
    return () => clearTimer();
  }, [curState]);

  return { curState, curTime, resetGame };
};

export default useGameFSM;
