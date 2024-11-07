import { clsx } from 'clsx'
import { CSSProperties, ReactNode, forwardRef } from 'react'

import s from './s.module.scss'

interface RenderPostsListProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

export const RenderPostsList = forwardRef<HTMLDivElement, RenderPostsListProps>(
    (props, ref) => {
        const { children, className, style } = props

        return (
            <div
                style={style}
                className={clsx(s.list, className)}
                ref={ref}
            >
                {children}
            </div>
        )
    },
)

RenderPostsList.displayName = 'RenderPostsList'
