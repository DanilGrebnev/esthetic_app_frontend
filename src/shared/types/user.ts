import { type Tag } from '@/shared/ui/InputWithTags/types'

interface TUser {
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface TCreateUser extends TUser {
    password: string
    avatar: File
    tags: Tag[]
}

export interface TChangeUser extends TCreateUser {}

export interface ProfileDetail extends TUser {
    userId: string
    subscribersAmount: number
    avatar: string
}

export interface TAuthor extends Omit<TUser, 'email'> {
    userId: string
    avatar: string
}
