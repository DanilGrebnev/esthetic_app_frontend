import { PostsListWithPagination } from '@/entities/posts'
import { Container } from '@/shared/ui/Container'

/* Созданные пользователем посты */
const CreatedPosts = () => {
    return (
        <Container>
            <PostsListWithPagination />
        </Container>
    )
}

export default CreatedPosts
