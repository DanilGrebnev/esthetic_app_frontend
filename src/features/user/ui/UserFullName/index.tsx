import clsx from 'clsx'

import s from './user-full-name.module.scss'

interface UserFullNameProps {
    className?: string
    firstName?: string
    lastName?: string

    size?: 'extra-big' | 'big' | 'normal' | 'small' | 'extra-small'
}

export const UserFullName = (props: UserFullNameProps) => {
    const { firstName, lastName, className, size = 'normal' } = props
    return (
        <p className={clsx(className, s['full-name'], s[size])}>
            {firstName + ' ' + lastName}
        </p>
    )
}
