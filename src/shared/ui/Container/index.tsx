import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

import s from './s.module.scss'

interface IContainer {
    children?: ReactNode
    className?: string
    size?: 'l' | 'm' | 's'
}

export const Container: FC<IContainer> = (props) => {
    const { children, className, size = 'l' } = props

    return (
        <section className={clsx(s.container, s[size], className)}>
            {children}
        </section>
    )
}
