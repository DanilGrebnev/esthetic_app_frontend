export const routes = {
    main: '/',
    createPost: '/create-posts',
    postsDetail(postId: string) {
        return `/detail-posts/${postId}`
    },
} as const
