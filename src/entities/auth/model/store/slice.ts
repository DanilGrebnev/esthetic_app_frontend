import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
    auth: boolean
}

interface Actions {
    setAuth: (auth: boolean) => void
}

export const useAuthStore = create<UserState & Actions>()(
    immer((set) => ({
        auth: false,
        setAuth: (auth: boolean) => {
            set((state) => {
                state.auth = auth
            })
        },
    })),
)
