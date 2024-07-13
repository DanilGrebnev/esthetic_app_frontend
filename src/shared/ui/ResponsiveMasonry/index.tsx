import dynamic from 'next/dynamic'

export const ResponsiveMasonry = dynamic(
    () =>
        import('./Masonry').then(
            ({ ResponsiveMasonryWrapper }) => ResponsiveMasonryWrapper,
        ),
    { ssr: false },
)
