import { ReactNode } from 'react'

import s from './title.module.scss'

interface TitleProps {
    children: ReactNode
}

export const Title = (props: TitleProps) => {
    const { children } = props
    return <h1 className={s.title}>{children}</h1>
}
