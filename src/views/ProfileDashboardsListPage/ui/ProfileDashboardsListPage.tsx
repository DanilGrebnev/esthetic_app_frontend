import { DashboardsList } from '@/entities/dashboard'

interface UserDashboardsPageProps {
    params: Promise<{
        userId: string
    }>
}

export const ProfileDashboardsListPage = async (
    props: UserDashboardsPageProps,
) => {
    const { userId } = await props.params
    return <DashboardsList userId={userId} />
}
