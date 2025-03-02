import { validationInputs } from '@/shared/validationInputs'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

import { RegistrationFormFields } from './types'

interface InputsData<T extends FieldValues> {
    name: keyof T
    label: string
    placeholder?: string
    registerOptions?: Parameters<UseFormRegister<T>>[1]
}
function test(n: number) {
    return true
}

test(2)
export const inputsFields: InputsData<RegistrationFormFields>[] = [
    {
        name: 'firstName',
        label: 'Имя*',
        registerOptions: { required: validationInputs.required.message },
    },
    {
        name: 'lastName',
        label: 'Фамилия',
    },
    {
        label: 'Псевдоним пользователя*',
        name: 'userName',
        placeholder: 'Введите желаемый псевдоним',
        registerOptions: { required: validationInputs.required.message },
    },
    {
        label: 'Пароль*',
        name: 'password',
        placeholder: 'Введите пароль',
        registerOptions: {
            minLength: {
                value: 5,
                message: 'Пароль должен содержать больше 5 символов',
            },
        },
    },
    {
        label: 'Почта*',
        placeholder: 'Введите почту',
        name: 'email',
        registerOptions: {
            required: validationInputs.required.message,
            pattern: {
                value: validationInputs.email.pattern,
                message: validationInputs.email.message,
            },
        },
    },
]
