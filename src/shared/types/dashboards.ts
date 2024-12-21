import { type TPostsPreview } from '@/shared/types/posts'
import { type UserProfile } from '@/shared/types/user'

interface Dashboard {
    dashboardId: string
    dashboardName: string
    postsAmount: number
    dateOfCreation: string
    urls: string[]
    urlsBlur: string[]
}

export interface UsersDashboardList {
    dashboardsAmount: number
    favorites: Dashboard
    dashboards: Dashboard[]
}

export interface DashboardsByCookieItem {
    dashboardId: string
    dashboardName: string
    urls: string[]
    urlsBlur: string[]
}

export interface DashboardsByCookie {
    dashboardsAmount: number
    favorites: Omit<DashboardsByCookieItem, 'dashboardName'> | null
    dashboards: DashboardsByCookieItem[]
}

export interface CheckPostInDashboardResponse {
    inFavorites: boolean
    inDashboards: string[]
}

export interface DashboardsDetail {
    author: UserProfile
    dashboardInfo: {
        dashboardId: string
        dashboardName: string
        dateOfCreation: string
        postsAmount: number
    }
    posts: TPostsPreview[]
}
