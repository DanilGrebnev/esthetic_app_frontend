'use client'

import CrossIcon from '@/shared/assets/cross.svg'
import { type FC, memo } from 'react'

import s from './s.module.scss'

interface TagItemProps {
    deleteTag: (tagId: string) => void
    tagId: string
    label: string
}

export const TagItem: FC<TagItemProps> = memo((props) => {
    const { deleteTag, tagId, label } = props

    return (
        <button
            title={label}
            className={s.tag}
            type='button'
            onClick={(e) => {
                e.stopPropagation()
                deleteTag(tagId)
            }}
        >
            <p>{label}</p>
            <CrossIcon className={s['tag__delete-btn']} />
        </button>
    )
})

TagItem.displayName = 'TagItem'
