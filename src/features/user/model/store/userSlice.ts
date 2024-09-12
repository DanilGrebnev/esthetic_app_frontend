import { UserProfile, UserPublicProfile } from '@/shared/types/user'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserState {
    privateProfile: UserProfile
    publicProfile: UserPublicProfile
}

interface Actions {
    setPrivateProfile: (profile: UserProfile) => void
    setPublicProfile: (profile: UserPublicProfile) => void
}

export const useUserStore = create<UserState & Actions>()(
    immer(
        devtools((set) => ({
            privateProfile: {
                userId: '',
                firstName: '',
                avatar: null,
                subscribersAmount: 0,
                userName: '',
                lastName: '',
                email: '',
            },
            publicProfile: {
                user: {
                    userId: '',
                    firstName: '',
                    avatar: null,
                    subscribersAmount: 0,
                    userName: '',
                    lastName: '',
                },
                guest: {
                    isOwner: false,
                    isSubscribe: false,
                },
            },
            setPrivateProfile: (privateProfile) => {
                set((state) => {
                    state.privateProfile = privateProfile
                })
            },
            setPublicProfile: (publicProfile) => {
                set((state) => {
                    state.publicProfile = publicProfile
                })
            },
        })),
    ),
)
