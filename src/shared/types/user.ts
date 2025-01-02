import { type Tag } from '@/shared/ui/InputWithTags'

/* Base user type */
interface BaseUser {
    firstName: string
    lastName: string
    userName: string
    email: string
}

/* Full user profile */
export interface UserProfile extends BaseUser {
    userId: string
    subscribersAmount: number
    avatar: string | null
}

/* Public users profile */
export interface UserPublicProfile {
    user: Omit<UserProfile, 'email'>
    guest: Guest
}

/* Private users profile*/
export type UserPrivateProfile = UserProfile & {
    tags: Tag[] | []
    avatarBlur?: string | null
}

/* Info about posts author */
export interface TAuthor extends Omit<BaseUser, 'email'> {
    userId: string
    avatar?: string | null
    avatarBlur?: string | null
}

/* Info about guest. Use with UserPublicProfile type */
interface Guest {
    isOwner: boolean
    isSubscribe: boolean
}

export interface CreateUser extends BaseUser {
    password: string
    avatar: File
    tags: Tag[]
}

/* Данные для изменения профиля пользователя */
export interface ChangeUser extends CreateUser {}

export interface UsersLoginBody {
    email: string
    password: string
}
