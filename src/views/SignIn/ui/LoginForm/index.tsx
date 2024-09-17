'use client'

import { useLoginMutation } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UsersLoginBody } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Dialog } from '@/shared/ui/Dialog'
import { Input } from '@/shared/ui/Input'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Title } from '../Title'
import s from './s.module.scss'

export const LoginForm = () => {
    const { handleSubmit, register } = useForm<UsersLoginBody>()
    const router = useRouter()

    const { mutate, isPending, isSuccess, isError } = useLoginMutation({
        onSuccess: () => {
            router.push(routes.main.getRoute())
        },
    })

    const onSubmit = handleSubmit((body) => {
        mutate(body)
    })

    return (
        <>
            <Container
                size='s'
                className={s['login-form']}
            >
                <form
                    onSubmit={onSubmit}
                    className={s.form}
                >
                    <Title text='Войти' />
                    <Input
                        {...register('email')}
                        label='Почта'
                        placeholder='Введите почту'
                    />
                    <Input
                        {...register('password')}
                        label='Пароль'
                        type='password'
                        placeholder='Введите пароль'
                    />
                    <Button
                        type='submit'
                        variant='silver'
                        // disabled={isSuccess}
                        loading={isPending}
                    >
                        Отправить
                    </Button>
                </form>
                <Dialog
                    className={s.dialog}
                    open={isError}
                    variant={'warning'}
                >
                    {'Ошибка авторизации'}
                </Dialog>
                <Dialog
                    className={s.dialog}
                    open={isSuccess}
                    variant={'success'}
                >
                    {'Авторизация успешна'}
                </Dialog>
            </Container>
        </>
    )
}
