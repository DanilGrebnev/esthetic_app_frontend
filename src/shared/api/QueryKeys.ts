class QueryKeys {
    readonly auth = {
        checkAuth: 'auth',
    } as const

    readonly users = {
        publicProfile: (userId: string) => 'public-profile-userId=' + userId,
        privateProfile: 'private-profile',
        createdPosts: (userId: string) => 'created-posts-userId=' + userId,
    } as const

    readonly dashboards = {
        // Список досок пользователя по id
        profileDashboardsList: (userId: string) =>
            'profile-dashboards-list-userid=' + userId,
        /* Получение досок по кукам пользователя.
         * Используется для модального окна с досками */
        getDashboardsListByCookie: 'dashboards-by-cookie',
        /* Проверка наличия поста в доске */
        checkPostInDashboard: (dashboardId: string) =>
            'check-post-in-dashboard-dashboardId=' + dashboardId,
        /* Получение детальной информации о доске */
        dashboardsDetail: 'dashboards-detail',
    } as const

    readonly posts = {
        postsDetail: 'posts-detail',
    } as const
}

export const queryKeys = new QueryKeys()
