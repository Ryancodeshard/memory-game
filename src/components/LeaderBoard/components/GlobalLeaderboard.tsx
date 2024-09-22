import { useEffect, useState } from "react";
import { supabase } from "../../../client/supabaseClient";
import Player from "../../../interfaces/Player";

function GlobalLeaderboard() {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    getplayers();
    console.log(players);
  }, []);

  async function getplayers() {
    const { data } = await supabase.from("leaderboard").select();
    setPlayers(data!);
  }

  return (
    // <RowBased leaderboard=/>
    <></>
  );
}

export default GlobalLeaderboard;
