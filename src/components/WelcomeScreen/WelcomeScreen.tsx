import React, { useRef } from "react";
import "./index.css"; // Import CSS file for styling
import { AppState } from "../../enums/AppState";
import { Flex, Input } from "@chakra-ui/react";
import { userStore } from "../../store/userStore";
import { Leaderboard } from "../LeaderBoard";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const WelcomeScreen = (props: Prop) => {
  const { setAppState } = props;
  const { setUsername, resetScore } = userStore();
  let nameRef = useRef<any>();
  const handleClick = () => {
    const username =
      nameRef.current.value === "" ? "Unknown" : nameRef.current.value;
    console.log(username);
    setUsername(username);
    setAppState(AppState.playing);
    resetScore();
  };

  const instructions = `
    Memorize the locations of the green squares within a given countdown time.\n 
    After the countdown, the green squares will vanish, then, click on the squares where the green ones were located. \n
    Success in remembering all green squares advances to the next level. \n
    Have fun!
  `;

  return (
    <div className="welcome-screen">
      <h1>Welcome to The Memory Game</h1>
      <div className="instructions">
        <h2>Instructions:</h2>
        <p style={{ whiteSpace: "break-spaces" }}>{instructions}</p>
      </div>
      <Flex direction={"column"} align={"center"} gap={5}>
        <Input
          width={"50%"}
          maxW={"200px"}
          placeholder="Username"
          ref={nameRef}
        />
        <button onClick={handleClick} className="start-button">
          Start Game
        </button>
        <Leaderboard />
      </Flex>
    </div>
  );
};

export { WelcomeScreen };
