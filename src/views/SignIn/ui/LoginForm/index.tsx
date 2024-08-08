'use client'

import { Input } from '@/shared/ui/Input'

import { Title } from '../Title'
import s from './s.module.scss'

export const LoginForm = () => {
    return (
        <div className={s['login-form']}>
            <Title text='Войти' />
            <form className={s.form}>
                <h2 className={s.title}>Войти</h2>
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
            </form>
        </div>
    )
}
