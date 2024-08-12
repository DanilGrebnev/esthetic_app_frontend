'use client'

import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'

import { Title } from '../Title'
import s from './s.module.scss'

export const RegistrationForm = () => {
    return (
        <Container
            size='s'
            className={s.page}
        >
            <form className={s['registration-form']}>
                <Title text='Регистрация' />
                <Input
                    label='Имя'
                    name='Имя'
                    placeholder='Введите имя'
                />
                <Input
                    label='Фамилия'
                    name='lastName'
                    placeholder='Введите фамилию'
                />
                <Input
                    label='Имя пользователя'
                    name='username'
                    placeholder='Введите имя пользователя'
                />
                <Input
                    label='Пароль'
                    name='password'
                    placeholder='Введите пароль'
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
