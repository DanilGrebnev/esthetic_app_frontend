import clsx from 'clsx'
import { CSSProperties, ReactNode, memo } from 'react'

import s from './s.module.scss'

interface BoxProps {
    children: ReactNode
    className?: string
    padding?: 'normal' | 'small' | 'large'
    boxShadow?: boolean
    style?: CSSProperties
}
export const Box = memo((props: BoxProps) => {
    const {
        children,
        boxShadow = false,
        padding = 'normal',
        style,
        className,
    } = props

    return (
        <div
            style={style}
            className={clsx(className, s.box, s['padding-' + padding], {
                [s.shadow]: boxShadow,
            })}
        >
            {children}
        </div>
    )
})

Box.displayName = 'Box'
