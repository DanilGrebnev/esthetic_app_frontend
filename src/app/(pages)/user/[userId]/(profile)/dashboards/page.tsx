import { getUserPublicProfileServerAction } from '@/shared/api/users'

export async function generateMetadata({
    params,
}: {
    params: { userId: string }
}) {
    const userProfile = await getUserPublicProfileServerAction(params.userId)

    return {
        title: `Доски пользователя ${userProfile.user.firstName} ${userProfile.user.lastName}`,
    }
}
export { UserDashboardsPage as default } from '@/views/UserDashboardsPage'
