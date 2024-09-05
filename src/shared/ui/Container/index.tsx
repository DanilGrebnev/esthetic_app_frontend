import clsx from 'clsx'
import type { CSSProperties, FC, ReactNode } from 'react'

import s from './s.module.scss'

interface IContainer {
    children?: ReactNode
    className?: string
    size?: 'l' | 'm' | 's'
    style?: CSSProperties
    id?: string
}

export const Container: FC<IContainer> = (props) => {
    const { children, id, style, className, size = 'l' } = props

    return (
        <section
            id={id}
            style={style}
            className={clsx(s.container, s[size], className)}
        >
            {children}
        </section>
    )
}
