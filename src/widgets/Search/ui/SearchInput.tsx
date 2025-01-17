'use client'

import { SearchPostsDropDown } from '@/entities/posts'
import { useGetActiveTagsFromSearchPostsSelector } from '@/shared/store/posts'
import clsx from 'clsx'
import { ChangeEvent, useMemo, useState } from 'react'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.scss'

interface SearchInputProps {
    className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
    const [value, setValue] = useState<string>('')
    const activeTags = useGetActiveTagsFromSearchPostsSelector()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const deleteLastTag = () => {}

    return (
        <div className={clsx(s['search-wrapper'], className)}>
            <LeftSideWithIcon className={s['left-side']} />
            <div className={s['input-wrapper']}>
                <input
                    placeholder='Поиск'
                    className={s.input}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div className={s['dropdown']}>
                <SearchPostsDropDown.ActiveTags />
                <SearchPostsDropDown.RecommendedTags />
            </div>
        </div>
    )
}
