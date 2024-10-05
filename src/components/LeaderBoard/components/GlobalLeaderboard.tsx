import { useEffect, useState } from "react";
import { supabase } from "../../../client/supabaseClient";
import Player from "../../../interfaces/Player";
import RowBased from "./RowBased";

function GlobalLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getplayers();
    console.log(players);
  }, []);

  async function getplayers() {
    const { data } = await supabase.from("leaderboard").select();
    setPlayers(data!);
  }

  return (
    <>
      <RowBased leaderboard={players} />
    </>
  );
}

export default GlobalLeaderboard;
