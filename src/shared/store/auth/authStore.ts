import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    auth: boolean
}

type Actions = {
    setAuth: (auth: boolean) => void
}

export const useAuthStore = create<State & Actions>()(
    immer((set) => ({
        auth: false,
        setAuth(auth) {
            set((state) => {
                state.auth = auth
            })
        },
    })),
)
