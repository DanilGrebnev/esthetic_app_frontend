import { type FC } from 'react'

import { DashboardItemSkeleton } from '../DashboardItemSkeleton'

interface DashboardListSkeletonProps {
    /* Количество скелетонов (опционально) */
    amount?: number
}

export const DashboardListSkeleton: FC<DashboardListSkeletonProps> = ({
    amount = 10,
}) => {
    return Array(amount)
        .fill('')
        .map((_, i) => <DashboardItemSkeleton key={i} />)
}
