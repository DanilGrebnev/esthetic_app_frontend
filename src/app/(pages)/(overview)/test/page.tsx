'use client'

import { useGetPostsQuery } from '@/shared/api/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { CellInput } from '@/shared/ui/CellInput'
import { Container } from '@/shared/ui/Container'
import { MasonryVirtual } from '@/shared/ui/MasonryVirtual'
import { PostsCard } from '@/widgets/PostsCard'
import { useState } from 'react'

const TestPage = () => {
    const { data, isPending, fetchNextPage } = useGetPostsQuery()

    const [aspectRatio, setAspectRatio] = useState<
        (typeof aspectRatioVariants)[number]
    >(aspectRatioVariants[3])

    return (
        <div>
            <h1>Test page</h1>
            <CellInput length={5} />
        </div>
    )
}

export default TestPage
