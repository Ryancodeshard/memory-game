import { useEffect, useState } from "react";
import { supabase } from "../../../client/supabaseClient";
import Player from "../../../interfaces/Player";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getplayers();
  }, []);

  async function getplayers() {
    const { data } = await supabase.from("leaderboard").select();
    setPlayers(data!);
  }

  return (
    <ul>
      {players.map((player) => (
        <li key={player.username}>{player.username}</li>
      ))}
    </ul>
  );
}

export default App;
