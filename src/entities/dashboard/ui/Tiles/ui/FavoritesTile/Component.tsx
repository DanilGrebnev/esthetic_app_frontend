import { Skeleton } from '@mui/material'
import { type CSSProperties, type ReactNode, forwardRef } from 'react'

interface ComponentProps {
    skeleton?: boolean
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
export const Component = forwardRef<any, ComponentProps>(
    ({ skeleton, children, style, className }, ref) => {
        if (skeleton) {
            return (
                <div>
                    <Skeleton
                        variant='rectangular'
                        animation='pulse'
                        ref={ref}
                        style={style}
                        className={className}
                    >
                        {children}
                    </Skeleton>
                </div>
            )
        }

        return (
            <div
                ref={ref}
                style={style}
                className={className}
            >
                {children}
            </div>
        )
    },
)

Component.displayName = 'Component'
