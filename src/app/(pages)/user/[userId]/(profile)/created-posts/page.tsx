import { Container } from '@/shared/ui/Container'
import { PostsList } from '@/widgets/PostsList'

/* Созданные пользователем посты */
const CreatedPosts = () => {
    return (
        <Container>
            <PostsList />
        </Container>
    )
}

export default CreatedPosts
