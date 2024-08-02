import { PostsList } from '@/entities/posts'
import { Container } from '@/shared/ui/Container'

/* Созданные пользователем посты */
const CreatedPosts = () => {
    return (
        <Container>
            <PostsList />
        </Container>
    )
}

export default CreatedPosts
