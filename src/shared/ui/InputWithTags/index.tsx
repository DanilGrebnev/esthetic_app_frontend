'use client'

import { useLatest } from '@/shared/hooks/useLatest'
import { clsx } from 'clsx'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'

import { Input } from './Input'
import { TagItem } from './TagItem'
import s from './s.module.scss'
import { Tags } from './types'

interface InputWithTagsProps {
    className?: string
    initialValue?: Tags[]
    onChange?: (value: string[]) => void
}

export const InputWithTags: FC<InputWithTagsProps> = (props) => {
    const { onChange, initialValue, className } = props

    const [tags, setTags] = useState<Tags[]>(() =>
        !initialValue?.length ? [] : initialValue,
    )
    const latestTags = useLatest(tags)

    const [wrapperWidth, setWrapperWidth] = useState<number>(0)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setWrapperWidth(wrapperRef?.current?.offsetWidth as number)
    }, [])

    useEffect(() => {
        onChange?.(tags.map(({ label }) => label))
    }, [tags, onChange])

    const deleteTag = useCallback(
        (tagId: string) => {
            setTags(latestTags.current.filter((tag) => tag.tagId !== tagId))
        },
        [latestTags],
    )

    const focusOnInput = () => {
        inputRef?.current?.focus()
    }

    return (
        <div
            ref={wrapperRef}
            onClick={focusOnInput}
            style={wrapperWidth ? { maxWidth: `${wrapperWidth}px` } : undefined}
            className={clsx(s['input-wrapper'], className)}
        >
            <div className={s['tags-list']}>
                {tags.map(({ tagId, label }) => {
                    return (
                        <TagItem
                            key={tagId}
                            tagId={tagId}
                            label={label}
                            deleteTag={deleteTag}
                        />
                    )
                })}
                <Input
                    ref={inputRef}
                    tags={latestTags}
                    setTags={setTags}
                    placeholder='Добавьте теги'
                />
            </div>
        </div>
    )
}
