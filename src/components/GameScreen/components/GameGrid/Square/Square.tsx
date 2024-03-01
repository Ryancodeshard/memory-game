import { useState } from "react";
import "./index.css";

interface Prop {
  isGreen: boolean;
}

const Square = (prop: Prop) => {
  const { isGreen } = prop;
  const [isShown, setIsShown] = useState();
  const sqStyle = {
    backgroundColor: `${isGreen ? "#22ff00" : "#f7ffeae2"}`,
  };
  return <div className="item" style={sqStyle} />;
};

export { Square };
