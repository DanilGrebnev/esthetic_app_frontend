'use client'

import clsx from 'clsx'
import { memo } from 'react'

import s from './s.module.scss'

interface UserNameProps {
    firstName: string
    lastName: string
    className?: string
}
export const UserName = memo((props: UserNameProps) => {
    const { firstName, lastName, className } = props

    return (
        <span className={clsx(s.username, className)}>
            {firstName + ' ' + lastName}
        </span>
    )
})

UserName.displayName = 'UserName'
