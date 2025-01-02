import clsx from 'clsx'
import { ReactNode } from 'react'

import s from './s.module.scss'

interface UserNameProps {
    children: ReactNode
    className?: string
}
export const UserName = (props: UserNameProps) => {
    const { children, className } = props

    return <span className={clsx(s.username, className)}>{children}</span>
}
