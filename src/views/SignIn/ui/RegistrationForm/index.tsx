'use client'

import { UserInputWithValidation } from '@/features/user'
import { ValidationInputs } from '@/shared/ValidationInputs'
import { type CreateUserDTO } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { Controller, useForm } from 'react-hook-form'

import { Title } from '../Title'
import s from './s.module.scss'

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Omit<CreateUserDTO, 'tags'>>({ mode: 'onBlur' })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return (
        <Container
            size='s'
            className={s.page}
        >
            <form
                onSubmit={onSubmit}
                className={s['registration-form']}
            >
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
                    placeholder='Ведите вашу фамилию'
                    name='lastName'
                    errors={errors}
                />
                <UserInputWithValidation
                    register={register}
                    label='Псевдоним пользователя'
                    name='userName'
                    placeholder='Введите желаемый псевдоним'
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
                    {...register('email', {
                        required: ValidationInputs.required.message,
                        pattern: {
                            value: ValidationInputs.email.pattern,
                            message: ValidationInputs.email.message,
                        },
                    })}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                />
                <Button
                    variant='silver'
                    type='submit'
                >
                    Регистрация
                </Button>
            </form>
        </Container>
    )
}
