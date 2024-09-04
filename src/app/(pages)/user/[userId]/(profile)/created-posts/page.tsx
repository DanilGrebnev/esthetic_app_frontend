import { Container } from '@/shared/ui/Container'
import { PostsListWithPagination } from '@/widgets/PostsList'

/* Созданные пользователем посты */
const CreatedPosts = () => {
    return (
        <Container>
            <PostsListWithPagination />
        </Container>
    )
}

export default CreatedPosts
