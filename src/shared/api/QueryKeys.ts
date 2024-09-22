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
        /*
         * Получение досок по кукам пользователя.
         * Используется для модального окна с досками
         * */
        getDashboardsListByCookie: 'dashboards-by-cookie',
        /* Проверка наличия поста в доске */
        checkPostInDashboard: 'check-post-in-dashboard',
        /* Получение детальной информации о доске */
        dashboardsDetail: 'dashboards-detail',
    } as const

    readonly posts = {
        postsDetail: 'posts-detail',
    } as const
}

export const queryKeys = new QueryKeys()
