import clsx from 'clsx'
import { type FC } from 'react'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.sass'

interface SearchInputProps {
    className?: string
}

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
    return (
        <div className={clsx(s['search-wrapper'], className)}>
            <LeftSideWithIcon className={s['left-side']} />
            <input
                placeholder='Поиск'
                className={s.input}
            />
        </div>
    )
}
