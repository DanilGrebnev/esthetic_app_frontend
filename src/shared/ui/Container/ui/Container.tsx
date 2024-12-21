import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'

import s from './s.module.scss'

interface IContainer {
    children?: ReactNode
    className?: string
    size?: 'l' | 'm' | 's'
    style?: CSSProperties
    id?: string
}

export const Container = (props: IContainer) => {
    const { children, className, size = 'l', ...otherProps } = props

    return (
        <section
            {...otherProps}
            className={clsx(s.container, s[size], className)}
        >
            {children}
        </section>
    )
}
