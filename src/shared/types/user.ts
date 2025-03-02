import { type Tag } from '@/shared/ui/InputWithTags'

import { Prettify } from './UtilityTypes'

/* Base user type */
interface BaseUser {
    firstName: string
    lastName: string
    userName: string
    email: string
}

/* Full user profile */

export type UserProfile = Prettify<
    BaseUser & {
        userId: string
        subscribersAmount: number
        avatar: string | null
    }
>

/* Public users profile */
export interface UserPublicProfile {
    user: Omit<UserProfile, 'email'>
    guest: Guest
}

/* Private users profile*/
export type UserPrivateProfile = Prettify<
    UserProfile & {
        tags: Tag[] | []
        avatarBlur?: string | null
    }
>

/* Info about posts author */

export type TAuthor = Prettify<
    {
        userId: string
        avatar?: string | null
        avatarBlur?: string | null
    } & Omit<BaseUser, 'email'>
>

/* Info about guest. Use with UserPublicProfile type */
interface Guest {
    isOwner: boolean
    isSubscribe: boolean
}
export type CreateUser = Prettify<
    { password: string; avatar: File; tags: Tag[] } & BaseUser
>

/* Данные для изменения профиля пользователя */
export type ChangeUser = Prettify<CreateUser>

export interface UsersLoginBody {
    email: string
    password: string
}
