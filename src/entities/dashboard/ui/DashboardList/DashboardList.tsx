import { DashboardListSkeleton } from '@/entities/dashboard/ui/DashboardList/DashboardListSkeleton'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

import { DashboardGroupContainer } from './DashboardGroupContainer'
import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'

interface DashboardListProps {
    className?: string
    isLoading?: boolean
    onClick?: () => void
}

export const DashboardList = forwardRef<HTMLDivElement, DashboardListProps>(
    (props, ref) => {
        const { className, isLoading } = props

        return (
            <div
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                className={clsx(s['dashboard-container'], className)}
            >
                <h2 className={s['container-title']}>Сохранение</h2>
                <div className={s['dashboard-list']}>
                    <DashboardGroupContainer groupName='Быстрое сохранение'>
                        <DashboardItem
                            isLoading={true}
                            dashboardName='Профиль'
                        />
                    </DashboardGroupContainer>

                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {!isLoading ? (
                            Array(20)
                                .fill('')
                                .map((_, i) => {
                                    return (
                                        <DashboardItem
                                            key={i}
                                            dashboardName={'Cars'}
                                        />
                                    )
                                })
                        ) : (
                            <DashboardListSkeleton />
                        )}
                    </DashboardGroupContainer>
                </div>
            </div>
        )
    },
)

DashboardList.displayName = 'DashboardList'
