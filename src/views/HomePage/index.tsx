'use client'

import { MasonryContainerWithBreakPoints } from '@/entities/posts'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'

export const Home = () => {
    const { data: recommendedPosts, isPending } = useGetRecommendedPosts()
    console.log(recommendedPosts)
    return (
        <Container>
            <MasonryContainerWithBreakPoints>
                {recommendedPosts?.posts?.map((post) => {
                    return (
                        <PostsCard
                            key={post.postId}
                            mediaUrl={post.url}
                            name={''}
                            aspect={post.aspectRatio}
                            postId={post.postId}
                        />
                    )
                })}
            </MasonryContainerWithBreakPoints>
        </Container>
    )
}
