'use client'

import { useFixSize } from '@/shared/hooks/useFixSize'
import { useLatest } from '@/shared/hooks/useLatest'
import { useSetValue } from '@/shared/ui/InputWithTags/hooks'
import { clsx } from 'clsx'
import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import { Tags } from '../types'
import { setInitialTagsState } from '../utils'
import { Input } from './Input'
import { TagItem } from './TagItem'
import s from './s.module.scss'

export type TInputWithTagsTagItemList = Tags[]

interface InputWithTagsProps {
    className?: string
    defaultValue?: Tags[] | []
    onClick?: (tagId: string) => void
    onChange?: (tags: Tags[]) => void
    disabled?: boolean
    name?: string
    value?: Tags[]
}

export const InputWithTags: FC<InputWithTagsProps> = memo((props) => {
    const {
        onChange,
        defaultValue,
        name = 'tags',
        className,
        value,
        disabled,
        onClick,
    } = props

    const [tags, setTags] = useState<Tags[]>(() =>
        setInitialTagsState(defaultValue),
    )
    const latestTags = useLatest(tags)
    useSetValue(setTags, value)

    const inputValueRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!inputValueRef.current) return
        inputValueRef.current.value = JSON.stringify(tags)
    }, [tags])

    const { nodeRef, width } = useFixSize<HTMLDivElement>()
    const inputRef = useRef<HTMLInputElement>(null)
    const focusOnInput = () => {
        inputRef?.current?.focus()
    }

    useEffect(() => {
        onChange?.(tags.map((tag) => tag))
    }, [tags, onChange])

    const deleteTag = useCallback(
        (tagId: string) => {
            setTags(latestTags.current.filter((tag) => tag.tagId !== tagId))
        },
        [latestTags],
    )

    return (
        <div
            ref={nodeRef}
            onClick={focusOnInput}
            style={width ? { maxWidth: width + 'px' } : undefined}
            className={clsx(s.input, { 'input-disabled': disabled }, className)}
        >
            <div className={s['tags-list']}>
                {tags.map(({ tagId, label }) => {
                    return (
                        <TagItem
                            key={tagId}
                            tagId={tagId}
                            label={label}
                            deleteTag={deleteTag}
                            onClick={onClick}
                        />
                    )
                })}
                <input
                    name={name}
                    ref={inputValueRef}
                    hidden
                />
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
