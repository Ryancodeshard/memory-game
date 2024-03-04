import { useState } from "react";
import "./index.css";

interface Prop {
  isGreen: boolean;
  isShown: boolean;
}

const Square = (prop: Prop) => {
  const { isShown, isGreen } = prop;
  const [isShowing, setIsShowing] = useState(isShown);
  const sqStyle = {
    backgroundColor: `${isGreen && isShowing ? "#22ff00" : "#f7ffeae2"}`,
  };
  return <div className="item" style={sqStyle} />;
};

export { Square };
