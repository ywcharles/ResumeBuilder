import { create } from 'zustand'

interface UserState {
  user: string | null
  setUser: (userId: string) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null, // User is userId in the database
  setUser: (userId: string) => set({ user: userId }),
}))

const useUser = () => {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    return [user, setUser] as const
  }

export default useUser
