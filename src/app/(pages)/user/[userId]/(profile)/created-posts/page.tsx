import { CreatedPostsPage } from '@/views/CreatedPostsPage'

interface Props {
    params: {
        userId: string
    }
}

/* Созданные пользователем посты */
const CreatedPosts = (props: Props) => {
    return <CreatedPostsPage userId={props.params.userId} />
}

export default CreatedPosts
