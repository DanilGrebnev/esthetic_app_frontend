import { type Tag } from '@/shared/ui/InputWithTags/types'

interface BaseUser {
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface CreateUser extends BaseUser {
    password: string
    avatar: File
    tags: Tag[]
}

/* Данные для изменения профиля пользователя */
export interface ChangeUser extends CreateUser {}

/* Профиль пользователя */
export interface UserProfile extends Omit<BaseUser, 'email'> {
    userId: string
    subscribersAmount: number
    avatar: string | null
}

export interface TAuthor extends Omit<BaseUser, 'email'> {
    userId: string
    avatar: string
}

export interface UsersLoginBody {
    email: string
    password: string
}
