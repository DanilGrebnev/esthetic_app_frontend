import clsx from 'clsx'
import { CSSProperties, ReactNode, memo } from 'react'

import s from './s.module.scss'

interface BoxProps {
    children: ReactNode
    className?: string
    padding?: 'normal' | 'small' | 'large'
    style?: CSSProperties
}
export const Box = memo((props: BoxProps) => {
    const { children, padding = 'normal', style, className } = props

    return (
        <div
            style={style}
            className={clsx(s.box, className, s['padding-' + padding])}
        >
            {children}
        </div>
    )
})

Box.displayName = 'Box'
