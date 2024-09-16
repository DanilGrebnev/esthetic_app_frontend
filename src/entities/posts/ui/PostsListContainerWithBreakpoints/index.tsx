import { FC } from 'react'

import s from './s.module.scss'

interface Props {
    children?: React.ReactNode
}

export const PostsListContainerWithBreakpoints: FC<Props> = ({ children }) => {
    return <div className={s.container}>{children}</div>
}
