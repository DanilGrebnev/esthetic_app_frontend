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
        <div
            title={label}
            className={s['tag-item']}
        >
            <p>{label}</p>
            <CrossIcon
                onClick={() => deleteTag(tagId)}
                className={s['tag__delete-btn']}
            />
        </div>
    )
})

TagItem.displayName = 'TagItem'