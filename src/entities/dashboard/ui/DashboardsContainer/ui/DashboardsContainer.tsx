import { Container } from '@/shared/ui/Container'
import { type FC, ReactNode } from 'react'

import s from './DashboardsContainer.module.scss'

interface DashboardsContainerProps {
    children: ReactNode
}

export const DashboardsContainer: FC<DashboardsContainerProps> = (props) => {
    const { children } = props

    return (
        <Container size='l'>
            <div className={s.container}>{children}</div>
        </Container>
    )
}

DashboardsContainer.displayName = 'DashboardsContainer'
