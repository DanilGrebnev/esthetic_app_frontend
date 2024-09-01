import { PostsListWithPagination } from '@/entities/posts'
import { Container } from '@/shared/ui/Container'

export const Home = () => {
    return (
        <Container>
            <PostsListWithPagination />
        </Container>
    )
}
