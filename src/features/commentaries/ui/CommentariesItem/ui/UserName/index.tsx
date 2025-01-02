'use client'

import clsx from 'clsx'
import { type ReactNode, memo } from 'react'

import s from './s.module.scss'

interface UserNameProps {
    children: ReactNode
    className?: string
}
export const UserName = memo((props: UserNameProps) => {
    const { children, className } = props

    return <span className={clsx(s.username, className)}>{children}</span>
})

UserName.displayName = 'UserName'
