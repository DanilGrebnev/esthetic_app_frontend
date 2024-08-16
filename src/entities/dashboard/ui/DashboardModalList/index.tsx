import { clsx } from 'clsx'
import { type FC } from 'react'

import { DashboardGroupContainer } from './DashboardGroupContainer'
import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'
import { DashboardListSkeleton } from './DashboardListSkeleton'

interface DashboardListProps {
    className?: string
    isLoading?: boolean
    onClick?: () => void
}

export const DashboardModalList: FC<DashboardListProps> = (props) => {
    const { className, isLoading } = props

    return (
        <div
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
}

DashboardModalList.displayName = 'DashboardList'
