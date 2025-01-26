'use client'

import { UploadUserAvatar } from '@/features/user'
import {
    useChangeUserProfileData,
    useGetProfileByCookieQuery,
} from '@/shared/api/users'
import { type CreateUser } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { Controller, useForm } from 'react-hook-form'

import { EditUserInfoSkeleton } from './components/EditUserInfoSkeleton'
import s from './s.module.scss'

export const EditUserInfoPage = () => {
    const { data: profile, isFetching } = useGetProfileByCookieQuery()
    const { mutate, isPending } = useChangeUserProfileData()

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, defaultValues },
    } = useForm<Omit<CreateUser, 'password' | 'avatar'>>({
        mode: 'onBlur',
        values: {
            firstName: profile?.firstName ?? '',
            lastName: profile?.lastName ?? '',
            email: profile?.email ?? '',
            userName: profile?.userName ?? '',
            tags: profile?.tags ?? [],
        },
    })

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
                        <Controller
                            control={control}
                            rules={{ required: 'Обязательно для заполнения' }}
                            name='firstName'
                            render={({ field }) => (
                                <Input
                                    label='Имя*'
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            rules={{ required: 'Обязательно для заполнения' }}
                            name='lastName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label='Фамилия*'
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            rules={{ required: 'Обязательно для заполнения' }}
                            name='userName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label='Username'
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            rules={{ required: 'Обязательно для заполнения' }}
                            name='email'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label='Почта пользователя'
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='tags'
                            render={({ field }) => {
                                return (
                                    <InputWithTags
                                        onChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                )
                            }}
                        />
                        {/* <InputWithTags
                            // onChange={(tags) => {
                            //     console.log(tags)
                            // }}
                            defaultValue={profile?.tags}
                        /> */}
                    </>
                )}

                <div className={s['btn-group']}>
                    <Button
                        type='submit'
                        variant='silver'
                    >
                        Изменить
                    </Button>
                    <Button onClick={() => reset(defaultValues)}>
                        Отменить
                    </Button>
                </div>
            </form>
        </Container>
    )
}
