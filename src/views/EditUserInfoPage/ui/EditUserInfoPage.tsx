'use client'

import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { UploadFiles } from '@/shared/ui/UploadFile'

import s from './s.module.scss'

export const EditUserInfoPage = () => {
    return (
        <Container
            size='s'
            className={s.page}
        >
            <header>
                <h1>Изменение профиля пользователя</h1>
            </header>
            <UploadFiles
                onChange={(file) => {
                    console.log(file)
                }}
            />
            <Input
                name='firstName'
                label='Имя пользователя'
            />
            <Input
                name='lastName'
                label='Фамилия пользователя'
            />
            <Input
                name='userName'
                label='Псевдоним пользователя'
            />
            <Input
                name='email'
                label='Почта пользователя'
            />
            <Input
                name='password'
                label='Пароль пользователя'
                type='password'
            />
            <InputWithTags />
            <div className={s['btn-group']}>
                <Button variant='silver'>Изменить</Button>
                <Button>Отменить</Button>
            </div>
        </Container>
    )
}
