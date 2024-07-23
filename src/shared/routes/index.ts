export const routes = {
    main: '/',
    createPost: '/create-posts',
    userProfile: '/user/profile',
    postsDetail(postId: string) {
        return `/detail-posts/${postId}`
    },
} as const
