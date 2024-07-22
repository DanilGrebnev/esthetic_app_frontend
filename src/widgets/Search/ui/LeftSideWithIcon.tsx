import SearchIcon from '@/shared/assets/search-icon.svg'
import { type FC } from 'react'
import s from './s.module.sass'
interface LeftSideWithIconProps {
    className?: string
}

export const LeftSideWithIcon: FC<LeftSideWithIconProps> = ({ className }) => {
    return (
        <div className={className}>
            <SearchIcon className={s['search-icon']} />
        </div>
    )
}
