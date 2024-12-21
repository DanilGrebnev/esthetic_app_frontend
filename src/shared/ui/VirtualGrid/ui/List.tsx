import { forwardRef } from 'react'

export const List = forwardRef<HTMLDivElement, any>(
    ({ style, children, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                ...style,
            }}
        >
            {children}
        </div>
    ),
)

List.displayName = 'List'
