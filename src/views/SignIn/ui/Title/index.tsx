import { type FC } from 'react'

import s from './s.module.scss'

interface TitleProps {
    text: string
}

export const Title: FC<TitleProps> = ({ text }) => {
    return <h1 className={s.title}>{text}</h1>
}
