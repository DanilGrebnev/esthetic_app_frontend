import { DashboardGroupContainer } from '@/entities/dashboard/ui/DashboardList/DashboardGroupContainer'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'

interface DashboardListProps {
    className?: string
    onClick?: () => void
}

export const DashboardList = forwardRef<HTMLDivElement, DashboardListProps>(
    (props, ref) => {
        const { className } = props

        return (
            <div
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                className={clsx(s['dashboard-container'], className)}
            >
                <h2 className={s['container-title']}>Сохранение</h2>
                <div className={s['dashboard-list']}>
                    <DashboardGroupContainer groupName='Быстрое сохранение'>
                        <DashboardItem name='Профиль' />
                    </DashboardGroupContainer>

                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {Array(20)
                            .fill('')
                            .map((_, i) => {
                                return (
                                    <DashboardItem
                                        key={i}
                                        name={'Cars'}
                                    />
                                )
                            })}
                    </DashboardGroupContainer>
                </div>
            </div>
        )
    },
)

DashboardList.displayName = 'DashboardList'
