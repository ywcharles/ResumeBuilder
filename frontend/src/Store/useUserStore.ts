import { useEffect } from 'react'
import { create } from 'zustand'

interface UserState {
  user: string | null
  setUser: (userId: string | null) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null, // User is userId in the database
  setUser: (userId: string | null) => set({ user: userId }),
}))

const useUser = (userId?: string) => {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        if (userId && !user) {
          setUser(userId);
        }
      }, [userId, user, setUser]);
    
    return [user, setUser] as const
  }

export default useUser
