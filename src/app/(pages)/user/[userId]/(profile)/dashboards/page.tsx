import { usersApi } from '@/shared/api/users'

export { ProfileDashboardsListPage as default } from '@/views/ProfileDashboardsListPage'

// export const generateMetadata = async ({
//     params,
// }: {
//     params: Promise<{ userId: string }>
// }) => {
//     const { userId } = await params

//     const userProfile = await usersApi.publicProfile(userId)

//     const {
//         user: { firstName, lastName },
//     } = userProfile

//     return {
//         title: `Доски пользователя ${firstName} ${lastName}`,
//     }
// }
