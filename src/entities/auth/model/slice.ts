import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
    auth: boolean
}

interface Actions {
    setAuth: (auth: boolean) => void
}

const useAuthStore = create<UserState & Actions>()(
    immer((set) => ({
        auth: false,
        setAuth: (auth: boolean) => {
            set((state) => {
                state.auth = auth
            })
        },
    })),
)

export const useGetIsAuth = () => {
    return useAuthStore((state) => state.auth)
}

export const useSetAuth = () => {
    return useAuthStore((state) => state.setAuth)
}
