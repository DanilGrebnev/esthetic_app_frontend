'use client'

import { UploadUserAvatar } from '@/features/user'
import {
    useChangeUserProfileData,
    useGetProfileByCookieQuery,
    usersApi,
} from '@/shared/api/users'
import { type CreateUser } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { InputWithValidation } from '@/shared/ui/InputWithValidation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import s from './s.module.scss'

export const EditUserInfoPage = () => {
    const { data: profile } = useGetProfileByCookieQuery()
    const { mutate } = useChangeUserProfileData()

    const {
        register,
        handleSubmit,
        formState: { errors, defaultValues },
    } = useForm<Omit<CreateUser, 'tags' | 'password' | 'avatar'>>({
        mode: 'onBlur',

        values: {
            firstName: profile?.firstName ?? ' ',
            lastName: profile?.lastName ?? ' ',
            email: profile?.email ?? ' ',
            userName: profile?.userName ?? ' ',
        },
    })

    // TODO: Доделать: не отправлять поля, которые не изменились
    const onSubmit = handleSubmit((data, e) => {
        const formData = new FormData(e?.target)

        Object.entries(defaultValues as any).forEach(([dK, dV]) => {})

        // mutate(formData)
    })

    return (
        <Container size='s'>
            <form
                onSubmit={onSubmit}
                className={s.page}
            >
                <header>
                    <h1 className={s.title}>Изменение профиля пользователя</h1>
                </header>
                <UploadUserAvatar
                    defaultValue={profile?.avatar}
                    className={s.avatar}
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
                    label='Username'
                    name='userName'
                />
                <InputWithValidation
                    register={register}
                    label='Почта пользователя*'
                    name='email'
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
