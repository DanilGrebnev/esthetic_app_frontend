'use client'

import { useGetPostsQuery } from '@/shared/api/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
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
            {/* <header className='flex gap-[20px]'>
                {aspectRatioVariants.map((v) => (
                    <button
                        key={v}
                        className='p-[10px] cursor-pointer'
                        onClick={() => setAspectRatio(v)}
                    >
                        {v}
                    </button>
                ))}
            </header> */}
            <Container>
                <MasonryVirtual
                    gap={10}
                    data={data?.posts}
                    endReached={fetchNextPage}
                >
                    {({ data }) => {
                        return (
                            <PostsCard
                                name='test name'
                                {...data}
                            />
                        )
                    }}
                </MasonryVirtual>
            </Container>
        </div>
    )
}

export default TestPage
