import { routes } from '@/shared/routes'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './s.module.scss'

interface UserBlockProps {
    ownerAvatar?: string
    ownerId?: string
    ownerName?: string
}

export const UserBlock = (props: UserBlockProps) => {
    const { ownerAvatar, ownerId, ownerName } = props

    return (
        <Link
            onClick={(e) => {
                e.stopPropagation()
            }}
            href={routes.userDashboards.getRoute(
                '7W0RIZ8qLGudb2nqJqAO9B8VBbfwOR',
            )}
            className={s.user_info}
        >
            <div className={s.avatar}></div>
            <p className={clsx(s.username, 'text-ellipsis ')}>Данил Гребнев</p>
        </Link>
    )
}
