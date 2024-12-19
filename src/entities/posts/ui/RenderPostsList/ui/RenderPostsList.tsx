import { clsx } from 'clsx'
import { forwardRef } from 'react'

import { RenderPostsListProps } from '../type'
import s from './s.module.scss'

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
            // <Grid
            //     columnCount={5}
            //     columnWidth={100}
            //     height={150}
            //     rowCount={1000}
            //     rowHeight={35}
            //     width={300}
            // >
            //     {children}
            // </Grid>
        )
    },
)

RenderPostsList.displayName = 'RenderPostsList'
