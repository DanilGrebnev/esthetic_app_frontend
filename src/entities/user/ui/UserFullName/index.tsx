import { Skeleton } from '@/shared/ui/Skeleton'
import clsx from 'clsx'

import s from './user-full-name.module.scss'

interface UserFullNameProps {
    className?: string
    firstName?: string
    lastName?: string

    size?: 'extra-big' | 'big' | 'normal' | 'small' | 'extra-small'
    loading?: boolean
}

export const UserFullName = (props: UserFullNameProps) => {
    const { loading, firstName, lastName, className, size = 'normal' } = props

    if (loading) {
        return (
            <div className={s.skeletons}>
                <Skeleton className={s.skeleton} />
                <Skeleton className={s.skeleton} />
            </div>
        )
    }

    return (
        <p className={clsx(className, s['full-name'], s[size])}>
            {firstName + ' ' + lastName}
        </p>
    )
}
