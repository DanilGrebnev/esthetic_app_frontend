'use client'

import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { UploadFiles } from '@/shared/ui/UploadFile'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Title } from '../Title'
import s from './s.module.scss'

interface ILogin {
    file: any
}

export const LoginForm = () => {
    const { handleSubmit, control, reset } = useForm<ILogin>()

    const onSubmit = handleSubmit((data) => console.log(data))

    return (
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
                    label='Логин'
                    name='login'
                    placeholder='Введите логин'
                />
                <Input
                    label='Пароль'
                    placeholder='Введите пароль'
                    name='password'
                />
                <Button
                    type='submit'
                    variant='silver'
                >
                    Отправить
                </Button>
            </form>
        </Container>
    )
}
