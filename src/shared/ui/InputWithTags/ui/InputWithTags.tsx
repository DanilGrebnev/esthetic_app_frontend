'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { useLatest } from '@/shared/hooks/useLatest'
import { clsx } from 'clsx'
import { type FC, forwardRef, memo, useCallback, useState } from 'react'

import { useSetValue, useSetValueInHiddenInput } from '../hooks'
import { useFocusOnInput } from '../hooks/useFocusOnInput'
import { InputWithTagsProps, Tag } from '../types'
import { setInitialTags } from '../utils'
import { Input } from './Input'
import { TagItem } from './TagItem'
import s from './s.module.scss'

export const InputWithTags = memo(
    forwardRef<HTMLInputElement, InputWithTagsProps>((props, ref) => {
        const {
            onChange,
            defaultValue,
            name = 'tags',
            className,
            value,
            disabled,
            onClick,
        } = props

        const [tags, setTags] = useState<Tag[]>(() =>
            setInitialTags(defaultValue),
        )
        const tagsValue = value ?? tags
        const latestTags = useLatest(tagsValue)

        const { hiddenInputRef } = useSetValueInHiddenInput(tagsValue)
        const { nodeRef, width } = useFixSize<HTMLDivElement>()
        const { inputRef, focusOnInput } = useFocusOnInput()

        const combinedHiddenInputRef = useCombinedRef(hiddenInputRef, ref)

        const deleteTag = useCallback(
            (tagId: string) => {
                const updatedTags = latestTags.current.filter(
                    (tag) => tag.tagId !== tagId,
                )
                if (onChange) {
                    onChange(updatedTags)
                } else {
                    setTags(updatedTags)
                }
            },
            [latestTags, onChange],
        )

        return (
            <div
                ref={nodeRef}
                onClick={focusOnInput}
                style={width ? { maxWidth: width + 'px' } : undefined}
                className={clsx(
                    s.input,
                    { 'input-disabled': disabled },
                    className,
                )}
            >
                <div className={s['tags-list']}>
                    {tagsValue.map(({ tagId, label }) => {
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
                        hidden
                        name={name}
                        ref={combinedHiddenInputRef}
                    />
                    <Input
                        ref={inputRef}
                        tags={tagsValue}
                        setTags={setTags}
                        placeholder='Добавьте теги'
                        onChange={onChange}
                    />
                </div>
            </div>
        )
    }),
)

InputWithTags.displayName = 'InputWithTags'
