import { animated, useTransition } from "@react-spring/web";
import { AppState } from "../../enums/AppState";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const GameSuccessScreen = (prop: Prop) => {
  const { setAppState } = prop;
  const ref = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [text, setText] = useState<string[]>([]);

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    setText([]);
    ref.current.push(
      setTimeout(() => setText(["Congrats", "you", "beat", "the game!"]), 2000)
    );
    ref.current.push(
      setTimeout(() => setText(["Congrats", "you", "the game!"]), 5000)
    );
    ref.current.push(
      setTimeout(
        () => setText(["Congrats", "you", "destroyed", "the game!"]),
        8000
      )
    );
  }, []);

  useEffect(() => {
    reset();
    return () => ref.current.forEach(clearTimeout);
  }, [reset]);

  const transitions = useTransition(text, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#8fa5b6",
    },
    enter: [
      { opacity: 1, height: 75, innerHeight: 75 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#28b4d7" },
  });

  return (
    <>
      <div className="center">
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className="transitionsItem" style={rest}>
            <animated.div style={{ overflow: "hidden", height: innerHeight }}>
              {item}
            </animated.div>
          </animated.div>
        ))}
        <Button variant={"solid"} onClick={() => setAppState(AppState.welcome)}>
          Back to main menu
        </Button>
      </div>
    </>
  );
};

export { GameSuccessScreen };
