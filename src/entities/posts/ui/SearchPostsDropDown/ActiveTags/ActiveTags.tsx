'use client'

import { useGetActiveTagsFromSearchPostsSelector } from '@/shared/store/posts'
import { useEffect, useState } from 'react'

import { SearchPostsTags } from '../../SearchPostsTagsItem'
import { SearchPostsDropDown } from '../BaseDropDown'

interface ActiveTagsProps {
    className?: string
}

export const ActiveTags = (props: ActiveTagsProps) => {
    const { className } = props
    const activeTags = useGetActiveTagsFromSearchPostsSelector()
    if (!activeTags.length) return null

    return (
        <SearchPostsDropDown
            className={className}
            mode='horizontal'
            title='Выбранные теги'
            data={activeTags}
        >
            {(tag) => (
                <SearchPostsTags
                    key={tag.id}
                    active={true}
                    {...tag}
                />
            )}
        </SearchPostsDropDown>
    )
}
