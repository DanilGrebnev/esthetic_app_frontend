import { memo } from 'react'

import s from './s.module.scss'

interface Props {
    children?: React.ReactNode
}

export const PostsListContainerWithBreakpoints = memo(({ children }: Props) => {
    return <div className={s.container}>{children}</div>
})

PostsListContainerWithBreakpoints.displayName =
    'PostsListContainerWithBreakpoints'
