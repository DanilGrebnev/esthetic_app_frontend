'use client'

import { PostsCardSkeleton } from '@/entities/posts'
import { MasonryContainerWithBreakPoints } from '@/entities/posts/ui/MasonryContainerWithBreakPoints'
import { Container } from '@/shared/ui/Container'

export const PostsListSkeleton = () => {
    const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']

    return (
        <Container>
            <MasonryContainerWithBreakPoints className='PostsList-loader'>
                {Array(25)
                    .fill('')
                    .map((_, i) => {
                        return <PostsCardSkeleton key={i} />
                    })}
            </MasonryContainerWithBreakPoints>
        </Container>
    )
}
