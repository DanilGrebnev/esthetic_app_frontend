import { DashboardItem } from '../DashboardItem'

export const DashboardItemSkeleton = () => {
    return (
        <DashboardItem
            dashboardId={''}
            postsId={''}
            skeleton={true}
            dashboardName='Загрузка dashboard'
        />
    )
}
