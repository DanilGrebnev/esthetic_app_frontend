import { UserProfile } from '@/shared/types/user'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
    profile: UserProfile | null
}

interface Actions {
    setUserProfile: (profile: UserProfile) => void
}

const useUserStore = create<UserState & Actions>()(
    immer((set) => ({
        profile: {
            userId: '',
            firstName: '',
            avatar: null,
            subscribersAmount: 0,
            userName: '',
            lastName: '',
        },

        setUserProfile: (profile) => {
            set((state) => {
                state.profile = profile
            })
        },
    })),
)

/* Получение профиля пользователя из хранилища */
export const useGetProfile = () => {
    return useUserStore((state) => state.profile)
}
/* Установка данных профиля пользователя в хранилище */
export const useSetProfile = () => {
    return useUserStore((state) => state.setUserProfile)
}
