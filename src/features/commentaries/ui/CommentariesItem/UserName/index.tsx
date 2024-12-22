import clsx from 'clsx'

import s from './s.module.scss'

interface UserNameProps {
    children: string
    className?: string
}
export const UserName = (props: UserNameProps) => {
    const { children, className } = props
    return <span className={clsx(s.username, className)}>{props.children}</span>
}
