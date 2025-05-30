import { useEffect } from 'react'
import { create } from 'zustand'
import { User } from '../types'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}))

const useUser = (initialUser?: User) => {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        if (initialUser && !user) {
          setUser(initialUser);
        }
      }, [initialUser, user, setUser]);
    
    return [user, setUser] as const
  }

export default useUser
