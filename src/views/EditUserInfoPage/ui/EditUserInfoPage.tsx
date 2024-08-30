'use client'

import { type CreateUserDTO } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { InputWithValidation } from '@/shared/ui/InputWithValidation'
import { UploadFiles } from '@/shared/ui/UploadFile'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import s from './s.module.scss'

export const EditUserInfoPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<CreateUserDTO, 'tags'>>({
        mode: 'onBlur',
    })

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
                    <h1 className={s.title}>Изменение профиля пользователя</h1>
                </header>
                <UploadFiles
                    className={s['upload-files']}
                    onChange={(file) => {
                        console.log(file)
                    }}
                />

                <InputWithValidation
                    register={register}
                    label='Имя*'
                    name='firstName'
                    errors={errors}
                    required
                />
                <InputWithValidation
                    register={register}
                    label='Фамилия'
                    name='lastName'
                />
                <InputWithValidation
                    register={register}
                    label='Почта пользователя*'
                    name='email'
                />
                <InputWithValidation
                    register={register}
                    label='Пароль*'
                    name='password'
                    type='password'
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
