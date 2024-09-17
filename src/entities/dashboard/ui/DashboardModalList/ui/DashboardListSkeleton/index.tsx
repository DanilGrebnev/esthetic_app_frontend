import { type FC } from 'react'

import { DashboardItem } from '../DashboardItem'

interface DashboardListSkeletonProps {
    /* Количество скелетонов (опционально) */
    amount?: number
}

export const DashboardListSkeleton: FC<DashboardListSkeletonProps> = ({
    amount = 10,
}) => {
    return Array(amount)
        .fill('')
        .map((_, i) => (
            <DashboardItem
                key={i}
                skeleton={true}
                dashboardName='Загрузка dashboard'
            />
        ))
}
