import { type Tag } from '@/shared/ui/InputWithTags/types'

interface User {
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface CreateUser extends User {
    password: string
    avatar: File
    tags: Tag[]
}

export interface ChangeUser extends CreateUser {}

export interface ProfileDetail extends User {
    userId: string
    subscribersAmount: number
    avatar: string
}

export interface TAuthor extends Omit<User, 'email'> {
    userId: string
    avatar: string
}

export interface UsersLoginBody {
    email: string
    password: string
}

export interface UsersLoginResponse {
    avatar: null | string
    firstName: string
    lastName: string
    subscribersAmount: number
    userId: string
    userName: string
}
