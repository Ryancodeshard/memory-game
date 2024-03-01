import { AppState } from "../../enums/appState";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const GameOverScreen = (prop: Prop) => {
  const { setAppState } = prop;
  return (
    <>
      <div>Game Over</div>
      <button onClick={() => setAppState(AppState.welcome)}>Restart</button>
    </>
  );
};

export { GameOverScreen };
