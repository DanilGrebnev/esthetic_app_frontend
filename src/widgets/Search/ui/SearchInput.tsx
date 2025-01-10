'use client'

import clsx from 'clsx'
import { ChangeEvent, type FC, useState } from 'react'

import { DropDown } from './DropDown'
import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.scss'

interface SearchInputProps {
    className?: string
}

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
    const [value, setValue] = useState<string>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className={clsx(s['search-wrapper'], className)}>
            <LeftSideWithIcon className={s['left-side']} />
            <input
                placeholder='Поиск'
                className={s.input}
                value={value}
                onChange={onChange}
            />
            {/* <DropDown /> */}
        </div>
    )
}
