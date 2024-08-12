'use client'

import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'

import { Title } from '../Title'
import s from './s.module.scss'

export const LoginForm = () => {
    return (
        <Container
            size='s'
            className={s['login-form']}
        >
            <form className={s.form}>
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
                <Button variant='silver'>Отправить</Button>
            </form>
        </Container>
    )
}
