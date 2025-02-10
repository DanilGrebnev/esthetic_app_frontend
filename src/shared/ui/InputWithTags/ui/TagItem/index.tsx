'use client'

import CrossIcon from '@/shared/assets/cross.svg'
import { memo, useCallback } from 'react'

import { Tag } from '../../types'
import s from './s.module.scss'

interface TagItemProps {
    tagId: string
    label: string
    onClick?: (tag: Tag) => void
    deleteTag: (tagId: string) => void
}

export const TagItem = memo((props: TagItemProps) => {
    const { tagId, label, deleteTag, onClick } = props

    const onTagClick = useCallback(
        (e: any) => {
            e.stopPropagation()
            deleteTag(tagId)
            onClick?.({ tagId, label })
        },
        [deleteTag, onClick, label, tagId],
    )

    return (
        <button
            title={label}
            className={s.tag}
            type='button'
            onClick={onTagClick}
        >
            <p>{label}</p>
            <CrossIcon className={s.tag__delete_btn} />
        </button>
    )
})

TagItem.displayName = 'TagItem'
