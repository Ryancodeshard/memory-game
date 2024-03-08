import { useCallback, useEffect, useMemo, useState } from "react";
import { GameState } from "../enums/GameState";
import shuffle from "../components/GameScreen/components/GameGrid/_helper/shuffle";
import { userStore } from "../store/userStore";
import nextlevel from "../gameSounds/mario-kart-lap-2.mp3"
import fail from "../gameSounds/super-mario-death-sound-sound-effect.mp3"
import useSound from "use-sound";

interface Prop{
  gridSize: number;
  numGreenSquares: number;
}

const timeForEachRound = 10

const useGameFSM = (props:Prop) => {
  const [nextlevelsfx] = useSound(nextlevel)
  const [failsfx] = useSound(fail);
  const {gridSize, numGreenSquares} = props;
  const stateMap = useMemo(() => [
    GameState.transition,
    GameState.memorize,
    GameState.transition,
    GameState.guess, 
    GameState.result
  ], []);
  const [curStateIndex, setCurStateIndex] = useState<number>(0);
  const nextState = stateMap[curStateIndex+1]
  const [curState, setCurState] = useState<GameState>(stateMap[curStateIndex]);
  const [curTime, setCurTime] = useState<number>(3);
  let interval: NodeJS.Timer;
  let timeout: NodeJS.Timeout;
  const [grids, setGrids] = useState<number[]>(Array.from({ length: gridSize ** 2 }, (_, i) => i))
  const [greenSquares, setGreenSquares] = useState<boolean[]>([]);
  const [guessSquares, setGuessSquares] = useState<Set<number>>(new Set([]));
  const [results, setResults] = useState<{correct:number,wrong:number,missed:number}>({correct:0,wrong:0,missed:0});

  const {addToLeaderBoard, updateScore} = userStore();

  const calculateResults = () => {
    let res = results;
    for (let i=0;i<=grids.length;i++){
      if (greenSquares[i] && guessSquares.has(i)) res = {...res, correct: res.correct+1}
      else if (greenSquares[i] && !guessSquares.has(i)) res = {...res, missed: res.missed+1}
      else if (!greenSquares[i] && guessSquares.has(i)) res = {...res, wrong: res.wrong+1}
    }
    return res
  }

  const guessSq = useCallback((index: number) => {
    let gs = guessSquares;
    gs.add(index);
    setGuessSquares(gs);
    if (curState===GameState.guess && guessSquares.size>=numGreenSquares) {
      if (calculateResults().correct===numGreenSquares) nextlevelsfx();
      else failsfx();
      goToNextState();
    }
  },[guessSquares,curState, numGreenSquares]);

  const clearTimer = () => {
    if (interval || timeout) {
      clearInterval(interval);
      clearTimeout(timeout)
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
      goToNextState();
    }, time * 1000);
  };

  const goToNextState = () => {
    setCurStateIndex((prev) => prev + 1);
  };

  const resetGame = () => {
    clearTimer();
    setCurStateIndex(0);
  };

  useEffect(()=>{
    if (results.correct+results.missed+results.wrong===0) return
    if (results.missed + results.wrong > 0) addToLeaderBoard();
    else updateScore(timeForEachRound-curTime);
  },[results, addToLeaderBoard, updateScore])

  useEffect(()=>{
    // Intialisation
    setGrids(Array.from({ length: gridSize ** 2 }, (_, i) => i));
    const greens = new Set(shuffle(grids).slice(0, numGreenSquares));
    setGreenSquares(Array.from({ length: gridSize ** 2 }, (_, i) => greens.has(i)))
    setGuessSquares(new Set([]))
  },[gridSize, numGreenSquares])

  useEffect(() => {
    if (curStateIndex !== -1 && curStateIndex < stateMap.length) {
      setCurState(stateMap[curStateIndex]);
    }
  }, [curStateIndex, stateMap]);

  useEffect(() => {
    switch (curState) {
      case GameState.transition:
        timer(3);
        break;
      case GameState.guess:
        timer(timeForEachRound);
        break;
      case GameState.memorize:
        timer(timeForEachRound);
        break;
      case GameState.result:
        setResults(calculateResults());
        break;
    }
    // Clean up the interval on unmount
    return () => clearTimer();
  }, [curState]);

  return { curState, curTime, resetGame, grids, gridSize, guessSq, greenSquares, guessSquares, results, nextState };
};

export default useGameFSM;
