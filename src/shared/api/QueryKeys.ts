class QueryKeys {
    readonly auth = {
        checkAuth: 'auth',
    } as const

    readonly users = {
        publicProfile: (userId: string) => 'public-profile-userId=' + userId,
        profileByCookie: 'profile-by-cookie',
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
        checkPostInDashboard: (postsId: string) =>
            'check-post-in-dashboard-postId=' + postsId,
        /* Получение детальной информации о доске */
        dashboardsDetail: (dashboardId: string) =>
            'dashboards-detail-dashboardsId=' + dashboardId,
    } as const

    readonly posts = {
        postsDetail: (postsId: string) => 'posts-detail-postsId=' + postsId,
        recommendedPosts: 'recommended-posts',
    } as const

    readonly comments = {
        commentsList: (postId: string) => 'comments-list-post=' + postId,
    }
}

export const queryKeys = new QueryKeys()
