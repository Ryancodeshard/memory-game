import { useRef, useState } from "react";
import "./index.css";

interface GuessProp {
  guessSq: () => void;
  isGreen: boolean;
  isGuessed: boolean;
}

const GuessSquare = (prop: GuessProp) => {
  const { guessSq, isGreen, isGuessed } = prop;
  const [guessed, setGuessed] = useState(false);
  console.log("guess status", guessed);
  return (
    <>
      {!guessed ? (
        <div
          onClick={() => {
            guessSq();
            setGuessed(true);
            console.log("SeTTING TO", guessed);
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
