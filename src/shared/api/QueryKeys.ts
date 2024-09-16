class QueryKeys {
    readonly auth = {
        checkAuth: 'auth',
    } as const

    readonly users = {
        publicProfile: 'public-profile',
        privateProfile: 'private-profile',
        createdPosts: 'created-posts',
    } as const

    readonly dashboards = {
        profileDashboardsList: 'profile-dashboards-list',
    } as const

    readonly posts = {
        postsDetail: 'posts-detail',
    } as const
}

export const queryKeys = new QueryKeys()
