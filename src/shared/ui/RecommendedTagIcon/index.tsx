import { clsx } from 'clsx'
import type { FC, ReactNode } from 'react'

import s from './RecommendedTagIcon.module.scss'

interface RecommendedTagIconProps {
    children?: ReactNode
    icon?: ReactNode
    onClick?: () => void
    checked?: boolean
}

export const RecommendedTagIcon: FC<RecommendedTagIconProps> = (props) => {
    const { icon, onClick, children, checked } = props

    return (
        <div
            onClick={onClick}
            className={clsx(s['tag-wrapper'], { [s.checked]: checked })}
        >
            <div>{children}</div>
            <div>{icon}</div>
        </div>
    )
}
