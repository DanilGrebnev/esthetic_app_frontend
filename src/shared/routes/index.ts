export const routes = {
    main: '/',
    createPost: '/create-posts',
    // userProfile: '/user/profile',
    userSavedPosts: '/user/profile/saved-posts',
    userCreatedPosts: '/user/profile/created-posts',
    postsDetail(postId: string) {
        return `/detail-posts/${postId}`
    },
} as const
