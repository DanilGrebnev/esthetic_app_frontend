import SearchIcon from '@/shared/assets/search-icon.svg'
import { type FC, memo } from 'react'

import s from './s.module.scss'

interface LeftSideWithIconProps {
    className?: string
}

export const LeftSideWithIcon: FC<LeftSideWithIconProps> = memo(
    ({ className }) => {
        return (
            <div className={className}>
                <SearchIcon className={s['search-icon']} />
            </div>
        )
    },
)

LeftSideWithIcon.displayName = 'LeftSideWithIcon'
