import SearchIcon from '@/shared/assets/search-icon.svg'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

import s from './mobile-open-search-btn.module.scss'

interface MobileOpenSearchBtnProps extends HTMLAttributes<HTMLDivElement> {}

export const MobileToggleSearchBtn = (props: MobileOpenSearchBtnProps) => {
    const { className, ...otherProps } = props

    return (
        <div
            {...otherProps}
            className={clsx(s.btn, className)}
        >
            <SearchIcon className={s.icon} />
        </div>
    )
}
