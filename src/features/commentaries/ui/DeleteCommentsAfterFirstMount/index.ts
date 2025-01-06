import dynamic from 'next/dynamic'

export const DeleteCommentsAfterFirstMount = dynamic(
    () =>
        import('./DeleteCommentsAfterFirstMount').then(
            ({ DeleteCommentsAfterFirstMount }) =>
                DeleteCommentsAfterFirstMount,
        ),
    { ssr: false },
)
