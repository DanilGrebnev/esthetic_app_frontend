'use client'

import { SearchPostsDropDown } from '@/entities/posts'
import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { useSetSearchValueSelector } from '@/shared/store/posts'
import { clsx } from 'clsx'
import { ChangeEvent, Ref, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { Input } from './Input'
import s from './s.module.scss'

interface SearchInputProps {
    className?: string
    ref?: Ref<HTMLDivElement>
    onOpen?: (open: boolean) => void
}

export const SearchInput = ({ className, onOpen, ref }: SearchInputProps) => {
    const [open, setOpen] = useState(false)

    const search = useSetSearchValueSelector()
    const setSearch = useDebounceCallback(search, 300)

    const { elementRef } = useOutsideClick({
        attached: open,
        handler: () => setOpen(false),
    })

    const combinedRef = useCombinedRef(elementRef, ref)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onFocus = () => {
        setOpen(true)
    }

    useEffect(() => {
        onOpen?.(open)
    }, [onOpen, open])

    return (
        <div
            ref={combinedRef}
            className={clsx(s.search_wrapper, className)}
        >
            <Input
                onFocus={onFocus}
                onChange={onChange}
            />
            {open && <SearchPostsDropDown className={s.dropdown} />}
        </div>
    )
}
