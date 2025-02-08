import clsx from 'clsx'
import { type CSSProperties, type ReactNode, memo } from 'react'

import s from './s.module.scss'

interface IContainer {
    children?: ReactNode
    className?: string
    size?: 'l' | 'm' | 's' | 'full'
    style?: CSSProperties
    id?: string
}

export const Container = memo((props: IContainer) => {
    const { children, className, size = 'l', ...otherProps } = props

    return (
        <section
            {...otherProps}
            className={clsx(s.container, s[size], className)}
        >
            {children}
        </section>
    )
})

Container.displayName = 'Container'
