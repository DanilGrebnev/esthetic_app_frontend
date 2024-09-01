import { PostsCardSkeleton } from '@/entities/posts'
import { MasonryContainerWithBreakPoints } from '@/entities/posts/ui/MasonryContainerWithBreakPoints'
import { Container } from '@/shared/ui/Container'
import { type FC } from 'react'

interface PostsListSkeletonProps {
    withMasonryContainer?: boolean
}

export const PostsListSkeleton: FC<PostsListSkeletonProps> = (props) => {
    const { withMasonryContainer = true } = props
    console.log('PostsListSkeleton')
    if (withMasonryContainer) {
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

    return (
        <>
            {Array(25)
                .fill('')
                .map((_, i) => {
                    return <PostsCardSkeleton key={i} />
                })}
        </>
    )
}
