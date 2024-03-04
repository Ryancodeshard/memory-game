import { useEffect, useState } from "react";
import "./index.css";

interface Prop {
  index: number;
  isGreen: boolean;
  isShown: boolean;
  removeSq: (index: number) => boolean;
}

const Square = (prop: Prop) => {
  const { index, isShown, isGreen, removeSq } = prop;
  const [isShowing, setIsShowing] = useState(isShown);
  return (
    <div
      onClick={() => {
        removeSq(index);
        setIsShowing(false);
      }}
      className={isGreen && isShown ? "green-sq" : "gray-sq"}
    />
  );
};

export { Square };
