import { useTransition, animated } from "@react-spring/web";

import "./index.css";
interface Prop {
  curTime: number;
  nextState: string;
  curLevel: number;
}

const Transition = (props: Prop) => {
  const { curTime, nextState, curLevel } = props;
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
        height: 200,
        innerHeight: 200,
        color: "#28b4d7",
      },
    ],
    leave: [{ opacity: 0, height: 0, color: "#ff0000e7" }],
    update: { color: "#28b4d7" },
  });
  return (
    <div className="center">
      <div>{`Level ${curLevel}`}</div>
      <div>{`Time to ${nextState}!`}</div>
      {transitions(({ innerHeight, ...rest }, item) => (
        <animated.div className="transitionsItem" style={rest}>
          <animated.div style={{ overflow: "hidden", height: innerHeight }}>
            {item}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
};
export { Transition };
