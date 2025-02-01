import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { CreatedPostsPage } from '@/views/CreatedPostsPage'

interface Props {
    params: Promise<{
        userId: string
    }>
}

export async function generateMetadata({ params }: Props) {
    const { userId } = await params
    const userProfile = await getUserPublicProfileServerAction(userId)

    return {
        title: `Посты пользователя ${userProfile.user.firstName} ${userProfile.user.lastName}`,
    }
}

/* Созданные пользователем посты */
const CreatedPosts = async ({ params }: Props) => {
    const { userId } = await params

    return <CreatedPostsPage userId={userId} />
}

export default CreatedPosts
