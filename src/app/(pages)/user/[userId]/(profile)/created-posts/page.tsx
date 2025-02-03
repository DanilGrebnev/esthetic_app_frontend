import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { UserPublicProfile } from '@/shared/types/user'
import { CreatedPostsPage } from '@/views/CreatedPostsPage'

interface Props {
    params: Promise<{
        userId: string
    }>
}

export async function generateMetadata({ params }: Props) {
    const { userId } = await params
    let userProfile: UserPublicProfile

    try {
        userProfile = await getUserPublicProfileServerAction(userId)
    } catch (err) {
        return {
            title: 'Ошибка получения профиля пользователя',
        }
    }
    console.log({ userProfile })
    console.log({ userId })
    return {
        title: `Посты пользователя ${userProfile?.user?.firstName} ${userProfile?.user?.lastName}`,
    }
}

/* Созданные пользователем посты */
const CreatedPosts = async ({ params }: Props) => {
    const { userId } = await params

    return <CreatedPostsPage userId={userId} />
}

export default CreatedPosts
