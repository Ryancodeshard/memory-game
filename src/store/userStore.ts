import { create } from "zustand";
import { persist } from 'zustand/middleware'
interface UserState {
  leaderboard: {
    date: string,
    score:number,
    time: number,
    username:string
  }[];
  curScore: { score: number, time: number};
  username: string;
}

type Action = {
  resetScore: ()=> void
  resetLeaderboard: () => void
  setUsername: (username: string) => void
  updateScore: (time_taken: number) => void
  addToLeaderBoard: () => void
}

export const initialUserState = {
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
  username: ''
}

export const userStore = create(persist<UserState & Action>((set) => ({
    ...initialUserState,
    resetLeaderboard: () => set(()=>({leaderboard: initialUserState.leaderboard})),
    resetScore: ()=>set(()=>({curScore: initialUserState.curScore})),
    setUsername: (username: string) => set( ()=> ({username: username})),
    updateScore: (time_taken: number) => set((state)=>({curScore: {score:state.curScore.score+1, time:state.curScore.time+time_taken}})),
    addToLeaderBoard: () => {
      set((state)=>{
        let newLeaderboard = state.leaderboard;
        const index = newLeaderboard.findIndex(obj => (obj.score<state.curScore.score || (obj.score===state.curScore.score && obj.time>state.curScore.time)));
        newLeaderboard.splice(index===-1?state.leaderboard.length:index, 0, {username: state.username, date: new Date().toLocaleString(), ...state.curScore});
        return {leaderboard: newLeaderboard}
      })
    },
}),{
  name: 'user-store',
}
),)