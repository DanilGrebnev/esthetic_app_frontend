import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { CreatedPostsPage } from '@/views/CreatedPostsPage'

interface Props {
    params: {
        userId: string
    }
}

export async function generateMetadata({
    params,
}: {
    params: { userId: string }
}) {
    const userProfile = await getUserPublicProfileServerAction(params.userId)

    return {
        title: `Посты пользователя ${userProfile.user.firstName} ${userProfile.user.lastName}`,
    }
}

/* Созданные пользователем посты */
const CreatedPosts = (props: Props) => {
    return <CreatedPostsPage userId={props.params.userId} />
}

export default CreatedPosts
