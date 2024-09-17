class QueryKeys {
    readonly auth = {
        checkAuth: 'auth',
    } as const

    readonly users = {
        publicProfile: 'public-profile',
        privateProfile: 'private-profile',
        createdPosts: (userId: string) => 'created-posts-userid=' + userId,
    } as const

    readonly dashboards = {
        profileDashboardsList: (userId: string) =>
            'profile-dashboards-list-userid=' + userId,
        dashboardsByCookie: 'dashboards-by-cookie',
    } as const

    readonly posts = {
        postsDetail: 'posts-detail',
    } as const
}

export const queryKeys = new QueryKeys()
