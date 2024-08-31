import dynamic from 'next/dynamic'

export const PostsCardSkeletonDynamic = dynamic(
    () =>
        import('./PostsCardSkeleton').then(
            ({ PostsCardSkeleton }) => PostsCardSkeleton,
        ),
    { ssr: false },
)
