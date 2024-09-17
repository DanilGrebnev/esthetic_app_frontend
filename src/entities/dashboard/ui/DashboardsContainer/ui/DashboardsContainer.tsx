import { Container } from '@/shared/ui/Container'
import { type FC, ReactNode } from 'react'

import s from './DashboardsContainer.module.scss'

interface DashboardsContainerProps {
    children: ReactNode
}

/* Адаптивный контейнер для досок без плитки */
export const DashboardsContainer: FC<DashboardsContainerProps> = (props) => {
    const { children } = props

    return (
        <Container
            size='l'
            className={s.container}
        >
            {children}
        </Container>
    )
}

DashboardsContainer.displayName = 'DashboardsContainer'
