import { DashboardsList } from '@/entities/dashboard'

interface UserDashboardsPageProps {
    params: Promise<{
        userId: string
    }>
}

export const ProfileDashboardsListPage = async ({
    params,
}: UserDashboardsPageProps) => {
    const { userId } = await params
    return <DashboardsList userId={userId} />
}
