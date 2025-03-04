import { CreateUser } from '@/shared/types/user'

export type RegistrationFormFields = Omit<CreateUser, 'tags'>
