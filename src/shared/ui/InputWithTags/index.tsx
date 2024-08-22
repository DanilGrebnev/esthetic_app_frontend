'use client'

import { useLatest } from '@/shared/hooks/useLatest'
import { clsx } from 'clsx'
import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { Input } from './Input'
import { TagItem } from './TagItem'
import s from './s.module.scss'
import { Tags } from './types'
import { setInitialTagsState } from './utils'

export type TInputWithTagsTagItemList = Tags[]

interface InputWithTagsProps {
    className?: string
    initialValue?: Tags[]
    onChange?: (tags: Tags[]) => void
    disabled?: boolean
}

export const InputWithTags: FC<InputWithTagsProps> = memo((props) => {
    const { onChange, initialValue, className, disabled } = props

    const [tags, setTags] = useState<Tags[]>(() =>
        setInitialTagsState(initialValue),
    )
    const latestTags = useLatest(tags)

    const [wrapperWidth, setWrapperWidth] = useState<number>(0)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setWrapperWidth(wrapperRef?.current?.offsetWidth as number)
    }, [])

    useEffect(() => {
        onChange?.(tags.map((tag) => tag))
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
            style={wrapperWidth ? { maxWidth: wrapperWidth + 'px' } : undefined}
            className={clsx(
                s['input-wrapper'],
                { 'input-disabled': disabled },
                className,
            )}
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
})

InputWithTags.displayName = 'InputWithTags'
