import { useGetPostsQuery } from '@/shared/api/posts'
import { TPostsCard } from '@/shared/types/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { Masonry, useInfiniteLoader } from 'masonic'

export const EasyMasonryComponent = (props: any) => {
    const { data, isPending, fetchNextPage } = useGetPostsQuery()
    const infiniteLoader = useInfiniteLoader(() => fetchNextPage())

    if (isPending || !data?.posts) return <h1>Loading...</h1>

    return (
        <Masonry
            items={data?.posts}
            render={MasonryCard}
            onRender={(startIndex, stopIndex, number) => {
                infiniteLoader(startIndex, stopIndex, number)
            }}
        />
    )
}

interface MasonryCardProps {
    index: number
    data: TPostsCard
    width: number
}

function MasonryCard({
    index,
    data: { aspectRatio, postId, url, urlBlur },
    width,
}: MasonryCardProps) {
    return (
        <PostsCard
            style={{ padding: '5px' }}
            postId={postId}
            aspectRatio={aspectRatio}
            url={url}
            urlBlur={urlBlur}
            name='test photo'
        />
    )
}
