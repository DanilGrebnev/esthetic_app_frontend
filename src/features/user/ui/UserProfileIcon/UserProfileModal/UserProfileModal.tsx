import { routes } from '@/shared/routes'
import { clsx } from 'clsx'
import Link from 'next/link'
import { type FC } from 'react'

import s from './UserProfileModal.module.scss'

interface UserProfileModalProps {
    className?: string
    auth: boolean
}

const NotAuthenticated = () => {
    return (
        <>
            <Link
                className={s.link}
                href={routes.login.getRoute()}
            >
                Войти
            </Link>
            <Link
                className={s.link}
                href={routes.registration.getRoute()}
            >
                Зарегистрироваться
            </Link>
        </>
    )
}

const SuccessAuthLinks = () => {
    return (
        <>
            <Link
                className={s.link}
                href={routes.userCreatedPosts.getRoute('123')}
            >
                Перейти в профиль
            </Link>
            <button className={s.link}>Выйти</button>
        </>
    )
}

export const UserProfileModal: FC<UserProfileModalProps> = (props) => {
    const { className, auth } = props

    return (
        <div className={clsx(s.modal, className)}>
            <div className={s['modal-wrapper']}>
                {auth ? <SuccessAuthLinks /> : <NotAuthenticated />}
            </div>
        </div>
    )
}
