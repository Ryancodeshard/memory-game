import { useState } from "react";
import "./index.css";
import wrong from "../../../../../gameSounds/death_E1a7HAQ.mp3";
import correct from "../../../../../gameSounds/nintendo-game-boy-startup.mp3";
import useSound from "use-sound";

interface GuessProp {
  guessSq: () => void;
  isGreen: boolean;
}

const GuessSquare = (prop: GuessProp) => {
  const [correctsfx] = useSound(correct);
  const [wrongsfx] = useSound(wrong);
  const { guessSq, isGreen } = prop;
  const [guessed, setGuessed] = useState(false);
  return (
    <>
      {!guessed ? (
        <div
          onClick={() => {
            guessSq();
            setGuessed(true);
            if (isGreen) correctsfx();
            else wrongsfx();
          }}
          className="gray-sq"
        />
      ) : isGreen ? (
        <div className="green-sq" />
      ) : (
        <div className="red-sq" />
      )}
    </>
  );
};

interface MemProp {
  isGreen: boolean;
}

const MemSquare = (prop: MemProp) => {
  const { isGreen } = prop;
  return <div className={isGreen ? "green-sq" : "gray-sq"} />;
};

interface ResultProp {
  isGreen: boolean;
  isGuessed: boolean;
}

const ResultSquare = (prop: ResultProp) => {
  const { isGreen, isGuessed } = prop;

  const Result = () => {
    if (isGuessed || isGreen) {
      if (!isGreen) return <div className="red-sq" />;
      if (!isGuessed) return <div className="blue-sq" />;
      else return <div className="green-sq" />;
    } else return <div className="gray-sq" />;
  };

  return <Result />;
};

export { GuessSquare, MemSquare, ResultSquare };
