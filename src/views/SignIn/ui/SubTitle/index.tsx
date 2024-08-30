import { FC, ReactNode } from 'react'

import s from './s.module.scss'

interface PageTitle {
    children?: ReactNode
}

export const SubTitle: FC<PageTitle> = ({ children }) => {
    return <h2 className={s.title}>{children}</h2>
}
