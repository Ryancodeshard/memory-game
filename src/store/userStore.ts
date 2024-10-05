import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { supabase } from "../client/supabaseClient";
// const crypto = require('crypto');

interface UserState {
  leaderboard: {
    date: string,
    score:number,
    time: number,
    player_id: string,
    username: string
  }[];
  curScore: { score: number, time: number};
  username: string;
  player_id: string,
}

type Action = {
  resetScore: ()=> void
  resetLeaderboard: () => void
  setUsername: (username: string) => void
  updateScore: (time_taken: number) => void
  // addToGlobalLeaderBoard: () => void
  addToLeaderBoard: () => void
}

export const initialUserState: UserState = {
  leaderboard: [
    // {username:"Ryan", date:"3/9/2024, 8:00:30 PM", score: 2, time: 0},
    // {username:"Ryan", date:"3/11/2024, 8:00:30 PM", score: 3, time: 0},
    // {username:"Ryan", date:"3/12/2024, 8:00:30 PM", score: 3, time: 0},
    // {username:"Ryan", date:"3/14/2024, 8:00:30 PM", score: 4, time: 0},
    // {username:"Ryan", date:"3/15/2024, 8:00:30 PM", score: 4, time: 0},
    // {username:"Ryan", date:"3/16/2024, 8:00:30 PM", score: 5, time: 0},
    // {username:"Ryan", date:"3/19/2024, 8:00:30 PM", score: 3, time: 0},
    // {username:"Ryan", date:"3/20/2024, 8:00:30 PM", score: 6, time: 0},
    // {username:"Ryan", date:"3/21/2024, 8:00:30 PM", score: 7, time: 0},
    // {username:"Ryan", date:"3/22/2024, 8:00:30 PM", score: 8, time: 0},
    // {username:"Ryan", date:"3/23/2024, 8:00:30 PM", score: 9, time: 0},
    // {username:"Ryan", date:"3/24/2024, 8:00:30 PM", score: 10, time: 0},
  ],
  curScore: {score: 0, time: 0},
  username: '',
  player_id: crypto.randomUUID(),
}

export const userStore = create(persist<UserState & Action>((set, get) => ({
    ...initialUserState,
    resetLeaderboard: () => set(()=>({leaderboard: initialUserState.leaderboard})),
    resetScore: ()=>set(()=>({curScore: initialUserState.curScore})),
    setUsername: (username: string) => set( ()=> ({username: username, player_id: crypto.randomUUID()})),
    updateScore: (time_taken: number) => set((state)=>({curScore: {score:state.curScore.score+1, time:state.curScore.time+time_taken}})),
    addToLeaderBoard: async () => {
      let newLeaderboard = get().leaderboard;
      const index = newLeaderboard.findIndex(obj => (obj.score<get().curScore.score || (obj.score===get().curScore.score && obj.time>get().curScore.time)));
      let newEntry = {player_id: get().player_id, username: get().username, date: new Date().toLocaleString(), ...get().curScore};
      if (index===-1){
        newLeaderboard.push(newEntry)
      }else{
        newLeaderboard.splice(
          index,
          0,
          newEntry
        )
      }
      // console.log(index, newEntry)
      if (index===0 || index===-1){
      const { data, error } = await supabase
        .from('leaderboard')
        .upsert(
          [{player_id: get().player_id, username: get().username, score: get().curScore.score, time: get().curScore.time }],
          { onConflict: 'player_id' }
        );
      }
      set((state)=>({leaderboard: newLeaderboard}))
    },
}),{
  name: 'user-store',
}
),)