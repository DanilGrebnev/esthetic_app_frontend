import { type Tag } from '@/shared/ui/InputWithTags/types'

interface UserDTO {
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface CreateUserDTO extends UserDTO {
    password: string
    avatar: File
    tags: Tag[]
}

export interface ChangeUserDTO extends CreateUserDTO {}
