import { AppState } from "../../enums/appState";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const GameScreen = (props: Prop) => {
  const { setAppState } = props;
  return (
    <>
      <button onClick={() => setAppState(AppState.gameover)}>Game over</button>
      <div>This is the game lmao</div>
    </>
  );
};

export { GameScreen };
