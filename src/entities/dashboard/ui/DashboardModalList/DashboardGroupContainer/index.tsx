import { type FC } from 'react'

import s from './s.module.scss'

interface DashboardGroupContainerProps {
    children?: React.ReactNode
    groupName: string
}

export const DashboardGroupContainer: FC<DashboardGroupContainerProps> = (
    props,
) => {
    const { children, groupName } = props
    return (
        <div className={s.container}>
            <h3 className={s.subtitle}>{groupName}</h3>
            {children}
        </div>
    )
}
