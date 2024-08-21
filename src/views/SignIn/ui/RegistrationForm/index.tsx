'use client'

import { UserInputWithValidation } from '@/features/user'
import { type CreateUserDTO } from '@/shared/types/user'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { useForm } from 'react-hook-form'

import { Title } from '../Title'
import s from './s.module.scss'

export const RegistrationForm = () => {
    const {
        register,
        formState: { errors },
    } = useForm<Omit<CreateUserDTO, 'tags'>>({ mode: 'onBlur' })
    console.log(errors)

    return (
        <Container
            size='s'
            className={s.page}
        >
            <form className={s['registration-form']}>
                <Title text='Регистрация' />
                <UserInputWithValidation
                    register={register}
                    label='Имя'
                    name='firstName'
                    errors={errors}
                    required
                />
                <UserInputWithValidation
                    register={register}
                    label='Фамилия'
                    name='lastName'
                    errors={errors}
                />
                <UserInputWithValidation
                    register={register}
                    label='Имя пользователя'
                    name='userName'
                    placeholder='Введите имя пользователя'
                    errors={errors}
                    required
                />
                <UserInputWithValidation
                    register={register}
                    label='Пароль'
                    name='password'
                    placeholder='Введите пароль'
                    errors={errors}
                    required
                />
                <Input
                    label='Почта'
                    placeholder='Введите почту'
                    name='Почта'
                />
            </form>
        </Container>
    )
}
