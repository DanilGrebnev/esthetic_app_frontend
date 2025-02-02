'use client'

import { useGetTagsQuery } from '@/shared/api/tags'
import {
    useGetIncludesActiveTagsInSearchPostsSelector,
    useGetSearchValueSelector,
} from '@/shared/store/posts'

import { BaseDropDown } from '../BaseDropDown'
import { SearchPostsTags } from '../SearchPostsTagsItem'

interface DropDown {
    className?: string
}

export const SearchTags = (props: DropDown) => {
    const { className } = props
    const includeTags = useGetIncludesActiveTagsInSearchPostsSelector()
    const search = useGetSearchValueSelector()

    const { data } = useGetTagsQuery({ search })

    return (
        <>
            <BaseDropDown
                hiddenIfEmptyData={true}
                className={className}
                data={data?.searchTags ?? []}
                mode='vertical'
                title='Существующие теги:'
            >
                {(tag) => (
                    <SearchPostsTags
                        key={tag}
                        tag={tag}
                        active={includeTags(tag)}
                    />
                )}
            </BaseDropDown>
            <BaseDropDown
                className={className}
                data={data?.recommendedTags ?? []}
                mode='vertical'
                title='Рекомендуемые теги:'
            >
                {(tag) => (
                    <SearchPostsTags
                        key={tag}
                        tag={tag}
                        active={includeTags(tag)}
                    />
                )}
            </BaseDropDown>
        </>
    )
}
