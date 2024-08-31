import { PostsListWithPagination } from '@/entities/posts'
import { Container } from '@/shared/ui/Container'

export const Home = async () => {
    return (
        <Container>
            <PostsListWithPagination />
        </Container>
    )
}
