'use client'

import { NotAuthMessage } from '@/shared/ui/NotAuthMessage'
import { WithAuth } from '@/shared/ui/WithAuth'
import clsx from 'clsx'

import s from './DashboardList.module.scss'
import { DashboardsListRender } from './DashboardsListRender'

interface DashboardListProps {
    className?: string
    onClick?: () => void
    postsId: string
}

export const DashboardModalList = (props: DashboardListProps) => {
    const { className, postsId } = props

    return (
        <div className={clsx(s.dashboard_container, className)}>
            <WithAuth
                fallback={<NotAuthMessage prefixText='чтобы сохранять посты' />}
            >
                <DashboardsListRender postsId={postsId} />
            </WithAuth>
        </div>
    )
}

DashboardModalList.displayName = 'DashboardsList'
