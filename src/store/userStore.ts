import { create } from "zustand";

interface HeaderState {
  leaderboard: {
    score:number,
    username:string
  }[];
  username: string;
}

type Action = {
  setUsername: (username: string) => void
}

export const initialUserState = {
  leaderboard: [],
  username: ''
}

export const userStore = create<HeaderState & Action>()(
  (set, get) => {return {
    ...initialUserState,
    setUsername: (username: string) => set( ()=> ({username: username})),
    addToLeaderBoard: (username: string, score: number) => {
      let newLeaderboard = get().leaderboard;
      const index = newLeaderboard.findIndex(obj => obj.score<=score);
      newLeaderboard.splice(index, 0, {username: username, score: score});
      set(()=> ({leaderboard: newLeaderboard}))
    },
  }}
)