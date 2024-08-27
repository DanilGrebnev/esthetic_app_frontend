'use client'

import { type CreateUserDTO } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags/ui'
import { UploadFiles } from '@/shared/ui/UploadFile'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ValidationInputs } from '../../../shared/ValidationInputs'
import s from './s.module.scss'

type FormTypes = Omit<CreateUserDTO, 'tags'>
export const EditUserInfoPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTypes>({ mode: 'onBlur' })

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <Container size='s'>
            <form
                onSubmit={handleSubmit(console.log)}
                className={s.page}
            >
                <header>
                    <h1>Изменение профиля пользователя</h1>
                </header>
                <UploadFiles
                    className={s['upload-files']}
                    onChange={(file) => {
                        console.log(file)
                    }}
                />
                <Input
                    label='Имя пользователя'
                    {...register('firstName', {
                        required: ValidationInputs.required.message,
                        pattern: {
                            value: ValidationInputs.onlyWords.pattern,
                            message: ValidationInputs.onlyWords.message,
                        },
                        minLength: {
                            value: 3,
                            message:
                                'Минимальная длинна не может быть меньше 3-х',
                        },
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <Input
                    label='Фамилия пользователя'
                    {...register('lastName', {
                        required: ValidationInputs.required.message,
                        pattern: {
                            value: ValidationInputs.onlyWords.pattern,
                            message: ValidationInputs.onlyWords.message,
                        },
                        minLength: {
                            value: 3,
                            message:
                                'Минимальная длинна не может быть меньше 3-х',
                        },
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <Input
                    label='Псевдоним пользователя'
                    {...register('userName')}
                />
                <Input
                    {...register('email')}
                    label='Почта пользователя'
                />
                <Input
                    label='Пароль пользователя'
                    type='password'
                    {...register('password')}
                />
                <InputWithTags />
                <div className={s['btn-group']}>
                    <Button
                        type='submit'
                        variant='silver'
                    >
                        Изменить
                    </Button>
                    <Button>Отменить</Button>
                </div>
            </form>
        </Container>
    )
}
