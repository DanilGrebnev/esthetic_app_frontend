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
        // Список досок пользователя
        profileDashboardsList: 'profile-dashboards-list',
        getDashboardsListByCookie: 'dashboards-by-cookie',
        checkPostInDashboard: 'check-post-in-dashboard',
        dashboardsDetail: 'dashboards-detail',
    } as const

    readonly posts = {
        postsDetail: 'posts-detail',
    } as const
}

export const queryKeys = new QueryKeys()
