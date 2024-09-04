import { Container } from '@/shared/ui/Container'
import { PostsListWithPagination } from '@/widgets/PostsList'

export const Home = () => {
    return (
        <Container>
            <PostsListWithPagination />
        </Container>
    )
}
