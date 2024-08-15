import { DashboardItem } from '../DashboardItem'

export const DashboardListSkeleton = () => {
    return Array(10)
        .fill('')
        .map((_, i) => (
            <DashboardItem
                key={i}
                skeleton={true}
                dashboardName='Загрузка dashboard'
            />
        ))
}
