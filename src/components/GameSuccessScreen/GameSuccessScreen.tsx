import { AppState } from "../../enums/appState";

interface Prop {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const GameSuccessScreen = (prop: Prop) => {
  const { setAppState } = prop;
  return (
    <>
      <div>Congratulations! You beat the game</div>
      <button onClick={() => setAppState(AppState.welcome)}>Restart</button>
    </>
  );
};

export { GameSuccessScreen };
