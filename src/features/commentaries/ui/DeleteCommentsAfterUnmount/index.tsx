import dynamic from 'next/dynamic'

export const DeleteCommentsAfterUnmount = dynamic(
    () =>
        import('./DeleteCommentsAfterUnmount').then(
            ({ DeleteCommentsAfterUnmount }) => DeleteCommentsAfterUnmount,
        ),
    { ssr: false },
)

export const DeleteCommentsComponents = {
    DeleteCommentsAfterUnmount,
}
