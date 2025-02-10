import { ReactNode, memo } from 'react'

import { Tag } from '../../types'

interface TagsRenderProps<T extends Tag[]> {
    tags: T
    children: (tag: T[number]) => ReactNode
}
export const TagsRender = memo(<T extends Tag[]>(props: TagsRenderProps<T>) => {
    const { tags, children } = props

    return tags.map(children)
})

TagsRender.displayName = 'TagsRender'
