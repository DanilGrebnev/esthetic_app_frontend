'use client'

import { SearchPostsDropDown } from '@/entities/posts'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import { ChangeEvent, useState } from 'react'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.scss'

interface SearchInputProps {
    className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
    const [value, setValue] = useState<string>('')
    const [open, setOpen] = useState(false)

    const { elementRef } = useOutsideClick({
        attached: open,
        handler: () => setOpen(false),
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onFocus = () => {
        setOpen(true)
    }

    return (
        <div
            ref={elementRef}
            className={clsx(s['search-wrapper'], 'search-input', className)}
        >
            <LeftSideWithIcon className={s['left-side']} />
            <div className={s['input-wrapper']}>
                <input
                    onFocus={onFocus}
                    placeholder='Поиск'
                    className={s.input}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {open && <SearchPostsDropDown className={s['dropdown']} />}
        </div>
    )
}
