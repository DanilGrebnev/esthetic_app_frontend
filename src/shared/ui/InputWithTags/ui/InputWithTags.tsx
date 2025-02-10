'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { useLatest } from '@/shared/hooks/useLatest'
import { clsx } from 'clsx'
import { forwardRef, memo, useCallback, useEffect, useState } from 'react'

import { useSetValueInHiddenInput } from '../hooks'
import { useFocusOnInput } from '../hooks/useFocusOnInput'
import { useTagsState } from '../hooks/useTagsState'
import { InputWithTagsProps, Tag } from '../types'
import { Input } from './Input'
import { TagItem } from './TagItem'
import { TagsRender } from './TagsRender'
import s from './s.module.scss'

/* Инпут с тегами.
 * @param defaultValues
 * @example <InputWithTags defaultValues={[{ tagId:'123', label: 'Автомобили' }]} />
 *  */
export const InputWithTags = memo((props: InputWithTagsProps) => {
    const {
        onChange,
        defaultValue,
        name = 'tags',
        className,
        value,
        disabled,
        onClick,
        ref,
    } = props

    const [tags, setTags] = useTagsState({ defaultValue })

    const tagsValue = value ?? tags
    const latestTags = useLatest(tagsValue)

    const { hiddenInputRef } = useSetValueInHiddenInput(tagsValue)
    const { nodeRef, width } = useFixSize<HTMLDivElement>()
    const { inputRef, focusOnInput } = useFocusOnInput()

    const combinedHiddenInputRef = useCombinedRef<HTMLInputElement>(
        hiddenInputRef,
        ref,
    )

    const deleteTag = useCallback(
        (tagId: string) => {
            const updatedTags = latestTags.current.filter(
                (tag) => tag.tagId !== tagId,
            )
            setTags(updatedTags)
            onChange?.(updatedTags)
        },
        [latestTags, onChange, setTags],
    )

    return (
        <div
            ref={nodeRef}
            onClick={focusOnInput}
            style={width ? { maxWidth: width + 'px' } : undefined}
            className={clsx(s.input, { 'input-disabled': disabled }, className)}
        >
            <div className={s.tags_list}>
                <TagsRender tags={tagsValue}>
                    {({ tagId, label }) => (
                        <TagItem
                            key={tagId}
                            tagId={tagId}
                            label={label}
                            deleteTag={deleteTag}
                            onClick={onClick}
                        />
                    )}
                </TagsRender>
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
})

InputWithTags.displayName = 'InputWithTags'
