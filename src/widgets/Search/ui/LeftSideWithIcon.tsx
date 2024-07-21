import SearchIcon from '@/shared/assets/search-icon.svg'
import clsx from 'clsx'
import { type FC } from 'react'

interface LeftSideWithIconProps {
    className?: string
}

export const LeftSideWithIcon: FC<LeftSideWithIconProps> = ({ className }) => {
    return (
        <div className={className}>
            <SearchIcon className='h-[20px] w-[20px]' />
        </div>
    )
}