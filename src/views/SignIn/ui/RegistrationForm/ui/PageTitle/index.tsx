import { FC, ReactNode } from 'react'

import s from './s.module.scss'

interface PageTitle {
    children?: ReactNode
}

export const PageTitle: FC<PageTitle> = ({ children }) => {
    return <h3 className={s.title}>{children}</h3>
}
