import { DashboardsList } from '@/entities/dashboard'
import { type FC } from 'react'

interface UserDashboardsPageProps {
    params: {
        userId: string
    }
}

export const UserDashboardsPage: FC<UserDashboardsPageProps> = (props) => {
    return <DashboardsList userId={props.params.userId} />
}
