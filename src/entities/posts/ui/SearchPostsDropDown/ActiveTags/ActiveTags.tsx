'use client'

import { useGetActiveTagsFromSearchPostsSelector } from '@/shared/store/posts'

import { SearchPostsDropDown } from '../BaseDropDown'
import { SearchPostsTags } from '../SearchPostsTagsItem'

interface ActiveTagsProps {
    className?: string
}

export const ActiveTags = (props: ActiveTagsProps) => {
    const { className } = props
    const activeTags = useGetActiveTagsFromSearchPostsSelector()
    if (!activeTags.length) return null

    return (
        <SearchPostsDropDown
            hiddenIfEmptyData={true}
            className={className}
            mode='horizontal'
            title='Выбранные теги'
            data={activeTags}
        >
            {(tag) => (
                <SearchPostsTags
                    key={tag}
                    active={true}
                    tag={tag}
                />
            )}
        </SearchPostsDropDown>
    )
}
