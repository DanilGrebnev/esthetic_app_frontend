import { routes } from '@/shared/routes'
import { clsx } from 'clsx'
import Link from 'next/link'
import { type FC } from 'react'

import s from './UserProfileModal.module.scss'

interface UserProfileModalProps {
    className?: string
}

export const UserProfileModal: FC<UserProfileModalProps> = (props) => {
    const { className } = props

    return (
        <div className={clsx(s.modal, className)}>
            <div className={s['modal-wrapper']}>
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
            </div>
        </div>
    )
}
