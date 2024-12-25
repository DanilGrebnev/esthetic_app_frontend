import { DashboardsList } from '@/entities/dashboard'

interface UserDashboardsPageProps {
    params: {
        userId: string
    }
}

export const ProfileDashboardsListPage = (props: UserDashboardsPageProps) => {
    return <DashboardsList userId={props.params.userId} />
}
