import { clsx } from 'clsx'
import { FC, ReactNode, memo } from 'react'

import s from './RecommendedTagIcon.module.scss'

interface RecommendedTagIconProps {
    children?: ReactNode
    icon?: ReactNode
    onClick: (tagId: string) => void
    checked?: boolean
    tagId: string
}

export const RecommendedTagIcon: FC<RecommendedTagIconProps> = memo((props) => {
    const { icon, onClick, children, tagId, checked } = props

    return (
        <div
            onClick={() => onClick(tagId)}
            className={clsx(s['tag-wrapper'], { [s.checked]: checked })}
        >
            <div>{children}</div>
            <div>{icon}</div>
        </div>
    )
})

RecommendedTagIcon.displayName = 'RecommendedTagIcon'
