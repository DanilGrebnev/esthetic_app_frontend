interface Dashboard {
    dashboardId: string
    dashboardName: string
    postsAmount: number
    dateOfCreation: string
    url: string[]
}

export interface UsersDashboardList {
    dashboardsAmount: number
    favorites: Dashboard
    dashboards: Dashboard[]
}

export interface DashboardsByCookie {
    dashboardsAmount: number
    favorites: {
        url: string
    } | null

    dashboards: [{ dashboardId: string; dashboardName: string; url: string }]
}

export interface CheckPostInDashboardResponse {
    inFavorites: boolean
    inDashboards: string[]
}
