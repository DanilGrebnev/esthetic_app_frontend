import clsx from 'clsx'
import type { CSSProperties, FC, ReactNode } from 'react'

import s from './s.module.scss'

interface IContainer {
    children?: ReactNode
    className?: string
    size?: 'l' | 'm' | 's'
    style?: CSSProperties
}

export const Container: FC<IContainer> = (props) => {
    const { children, style, className, size = 'l' } = props

    return (
        <section
            style={style}
            className={clsx(s.container, s[size], className)}
        >
            {children}
        </section>
    )
}
