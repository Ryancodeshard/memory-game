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
  leaderboard: [],
  curScore: {score: 0, time: 0},
  username: ''
}

export const userStore = create(persist<UserState & Action>((set) => ({
    ...initialUserState,
    resetLeaderboard: () => set(()=>({leaderboard: initialUserState.leaderboard})),
    resetScore: ()=>set(()=>({curScore: initialUserState.curScore})),
    setUsername: (username: string) => set( ()=> ({username: username})),
    updateScore: (time_taken: number) => set((state)=>({curScore: {date: new Date().toLocaleDateString(), score:state.curScore.score+1, time:state.curScore.time+time_taken}})),
    addToLeaderBoard: () => {
      set((state)=>{
        let newLeaderboard = state.leaderboard;
        const index = newLeaderboard.findIndex(obj => (obj.score<state.curScore.score || (obj.score===state.curScore.score && obj.time>state.curScore.time)));
        newLeaderboard.splice(index===-1?state.leaderboard.length:index, 0, {username: state.username, date: new Date().toLocaleDateString(), ...state.curScore});
        return {leaderboard: newLeaderboard}
      })
    },
}),{
  name: 'user-store',
}
),)