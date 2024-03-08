import { create } from "zustand";
import { persist } from 'zustand/middleware'
interface UserState {
  count:number;
  leaderboard: {
    score:number,
    time: number,
    username:string
  }[];
  curScore: {score: number, time: number};
  username: string;
}

type Action = {
  countUp: () => void
  setUsername: (username: string) => void
  resetScore: ()=> void
  updateScore: (time_taken: number) => void
  addToLeaderBoard: () => void
}

export const initialUserState = {
  count:0,
  leaderboard: [],
  curScore: {score: 0, time: 0},
  username: ''
}

export const userStore = create(persist<UserState & Action>((set) => ({
    ...initialUserState,
    countUp: () => set((state)=>({count: state.count+1})),
    setUsername: (username: string) => set( ()=> ({username: username})),
    resetScore: ()=>set(()=>({curScore: initialUserState.curScore})),
    updateScore: (time_taken: number) => set((state)=>({curScore: {score:state.curScore.score+1, time:state.curScore.time+time_taken}})),
    addToLeaderBoard: () => {
      set((state)=>{
        let newLeaderboard = state.leaderboard;
        const index = newLeaderboard.findIndex(obj => (obj.score>state.curScore.score || (obj.score===state.curScore.score && obj.time>state.curScore.time)));
        newLeaderboard.splice(index, 0, {username: state.username, ...state.curScore});
        return {leaderboard: newLeaderboard}
      })
    },
}),{
  name: 'user-store',
}
),)