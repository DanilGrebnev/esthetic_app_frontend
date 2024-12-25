import clsx from 'clsx'
import { type ReactNode } from 'react'

import s from './s.module.scss'

interface DashboardGroupContainerProps {
    children?: ReactNode
    groupName: string
    className?: string
}

export const DashboardGroupContainer = (
    props: DashboardGroupContainerProps,
) => {
    const { children, groupName, className } = props
    return (
        <div className={clsx(s.container, className)}>
            <h3 className={s.subtitle}>{groupName}</h3>
            {children}
        </div>
    )
}
