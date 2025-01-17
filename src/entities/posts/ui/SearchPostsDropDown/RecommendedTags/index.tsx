'use client'

import { useGetIncludesActiveTagsInSearchPostsSelector } from '@/shared/store/posts'

import { SearchPostsTags } from '../../SearchPostsTagsItem'
import { SearchPostsDropDown } from '../BaseDropDown'
import mockTags from './mock-tags.json'

interface DropDown {
    className?: string
}

export const RecommendedTags = (props: DropDown) => {
    const { className } = props
    const includeTags = useGetIncludesActiveTagsInSearchPostsSelector()

    return (
        <SearchPostsDropDown
            className={className}
            data={mockTags}
            mode='vertical'
            title='Рекомендуемые теги:'
        >
            {({ id, tag }) => (
                <SearchPostsTags
                    key={id}
                    id={id}
                    tag={tag}
                    active={includeTags(id)}
                />
            )}
        </SearchPostsDropDown>
    )
}
