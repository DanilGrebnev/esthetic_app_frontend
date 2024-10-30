import { usersApi } from '@/shared/api/users'

export { ProfileDashboardsListPage as default } from '@/views/ProfileDashboardsListPage'

export const generateMetadata = async ({
    params,
}: {
    params: { userId: string }
}) => {
    const userProfile = await usersApi.publicProfile(params.userId)
    const {
        user: { firstName, lastName },
    } = userProfile

    return {
        title: `Доски пользователя ${firstName} ${lastName}`,
    }
}
