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
