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
import { EditUserInfoSkeleton } from '@/views/EditUserInfoPage/ui/ui/EditUserInfoSkeleton'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import s from './s.module.scss'

export const EditUserInfoPage = () => {
    const { data: profile, isFetching } = useGetProfileByCookieQuery()
    const { mutate, isPending } = useChangeUserProfileData()

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
    useEffect(() => {
        console.log('isFetching', isFetching)
    }, [isFetching])

    useEffect(() => {
        console.log('Profile update')
    }, [profile])

    const onSubmit = handleSubmit((data, e) => {
        const formData = new FormData(e?.target)

        Object.entries(defaultValues as any).forEach(([defaultK, defaultV]) => {
            if (data[defaultK as keyof typeof data] === defaultV) {
                formData.delete(defaultK)
            }
        })

        if (!(formData.get('avatar') as File).size) {
            formData.delete('avatar')
        }

        mutate(formData)
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
                {isFetching || isPending ? (
                    <EditUserInfoSkeleton />
                ) : (
                    <>
                        <UploadUserAvatar
                            defaultValue={
                                profile?.avatar &&
                                `${profile?.avatar}?${'id=' + Date.now()}`
                            }
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

                        <InputWithTags defaultValue={profile?.tags} />
                    </>
                )}

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
