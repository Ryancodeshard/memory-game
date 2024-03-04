import { useEffect, useState } from "react";
import { GameState } from "../enums/GameState";

const useGameFSM = () => {
  useEffect(()=>console.log("NEW GAME"),[])
  const stateMap = [GameState.transition, GameState.memorize, GameState.transition, GameState.guess, GameState.result]
  const [curStateIndex, setCurStateIndex] = useState<number>(0);
  const [curState, setCurState] = useState<GameState>(stateMap[curStateIndex]);
  const [curTime, setCurTime] = useState<number>(0);

  const nextState = () => {
    setCurStateIndex(prev=>prev+1);
  }

  useEffect(()=>{
    if (curStateIndex !== -1 && curStateIndex < stateMap.length) {
      setCurState(stateMap[curStateIndex])
    } else {
      console.log('Level Over');
    }
  },[curStateIndex, stateMap])

  useEffect(()=>{
    const timer = (time: number) => {
      setCurTime(time);
      const interval = setInterval(() => {
        setCurTime((prevCount: number) => prevCount - 1);
      }, 1000);
  
      // Clear the interval after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
        nextState();
      }, time * 1000);
  
      // Clean up the interval on unmount
      return () => clearInterval(interval);
    };

    switch (curState) {
      case GameState.transition:
        timer(3);
        break;
      case GameState.guess:
        timer(10);
        break;
      case GameState.memorize:
        timer(10);
        break;
      case GameState.result:
        break;
    }
  },[curState])

  return {curState, curTime}
}

export {useGameFSM};