'use client'

import CrossIcon from '@/shared/assets/cross.svg'
import { type FC, memo } from 'react'

import { Tag } from '../../types'
import s from './s.module.scss'

interface TagItemProps {
    deleteTag: (tagId: string) => void
    tagId: string
    label: string
    onClick?: (tag: Tag) => void
}

export const TagItem = memo((props: TagItemProps) => {
    const { tagId, label, deleteTag, onClick } = props

    return (
        <button
            title={label}
            className={s.tag}
            type='button'
            onClick={(e) => {
                e.stopPropagation()
                deleteTag(tagId)
                onClick?.({ tagId, label })
            }}
        >
            <p>{label}</p>
            <CrossIcon className={s['tag__delete-btn']} />
        </button>
    )
})

TagItem.displayName = 'TagItem'
