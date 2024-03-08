import { Text } from "@chakra-ui/react";
import { GameState } from "../../../../enums/GameState";
import { animated, useTransition } from "@react-spring/web";
import "./index.css";
interface Prop {
  curTime: number;
  curState: GameState;
  results: { correct: number; wrong: number; missed: number };
}

const GameInfo = (props: Prop) => {
  const { curTime, curState, results } = props;
  const transitions = useTransition(curTime, {
    from: {
      opacity: 1,
      height: 0,
      innerHeight: 0,
      color: "#8fa5b6",
    },
    enter: [
      {
        transform: "scale(1)",
        opacity: 1,
        height: 100,
        innerHeight: 100,
        color: "#28b4d7",
      },
    ],
    leave: [{ opacity: 0, height: 0, color: "#ff0000e7" }],
    update: { color: "#28b4d7" },
  });

  const InfoStates = () => {
    if (curState === GameState.result) {
      if (results.missed + results.wrong > 0)
        return (
          <div className="normal-text">{`Aww. You got ${results.wrong} wrong and missed ${results.missed}!`}</div>
        );
      else return <div className="normal-text">Wow! All correct!</div>;
    }
  };

  return (
    <div>
      {curState === GameState.result ? (
        <div className="normal-text">{`Aww. You got ${results.wrong} wrong and missed ${results.missed}!`}</div>
      ) : (
        <div className="game-text">
          {transitions(({ innerHeight, ...rest }, item) => (
            <animated.div className="transitionsItem" style={rest}>
              <animated.div style={{ overflow: "hidden", height: innerHeight }}>
                {item}
              </animated.div>
            </animated.div>
          ))}
          <Text>{GameState[curState]}</Text>
        </div>
      )}
    </div>
  );
};

export { GameInfo };
