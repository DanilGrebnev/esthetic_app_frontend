'use client'

import { SearchPostsDropDown } from '@/entities/posts'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { useSetSearchValueSelector } from '@/shared/store/posts'
import { clsx } from 'clsx'
import { ChangeEvent, useState } from 'react'
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.scss'

interface SearchInputProps {
    className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
    const [open, setOpen] = useState(false)

    const search = useSetSearchValueSelector()
    const setSearch = useDebounceCallback(search, 300)

    const { elementRef } = useOutsideClick({
        attached: open,
        handler: () => setOpen(false),
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onFocus = () => {
        setOpen(true)
    }

    return (
        <div
            ref={elementRef}
            className={clsx(s['search-wrapper'], className)}
        >
            <LeftSideWithIcon className={s['left-side']} />
            <div className={s['input-wrapper']}>
                <input
                    onFocus={onFocus}
                    placeholder='Поиск'
                    className={s.input}
                    onChange={onChange}
                />
            </div>
            {open && <SearchPostsDropDown className={s['dropdown']} />}
        </div>
    )
}
