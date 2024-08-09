import { clsx } from 'clsx'
import { forwardRef } from 'react'

import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'

interface DashboardListProps {
    className?: string
}

export const DashboardList = forwardRef<HTMLDivElement, DashboardListProps>(
    (props, ref) => {
        const { className } = props

        return (
            <div
                ref={ref}
                className={clsx(s['dashboard-container'], className)}
            >
                <div className={s['dashboard-list']}>
                    {Array(20)
                        .fill('')
                        .map((_, i) => {
                            return <DashboardItem key={i} />
                        })}
                </div>
            </div>
        )
    },
)

DashboardList.displayName = 'DashboardList'
