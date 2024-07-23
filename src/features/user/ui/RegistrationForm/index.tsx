'use client'

import { Input } from '@/shared/ui/Input'
import s from './s.module.scss'

export const RegistrationForm = () => {
    return (
        <div className={s['registration-form']}>
            <Input
                label='Имя'
                name='Имя'
                placeholder='Введите имя'
            />
            <Input
                label='Почта'
                placeholder='Введите почту'
                name='Почта'
            />
        </div>
    )
}
