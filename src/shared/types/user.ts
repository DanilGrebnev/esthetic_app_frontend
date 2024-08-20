import { TInputWithTagsTagItemList } from '@/shared/ui/InputWithTags'

interface UserDTO {
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface CreateUserDTO extends UserDTO {
    password: string
    avatar: string
    tags: TInputWithTagsTagItemList
}

export interface ChangeUserDTO extends CreateUserDTO {}
