import { Container } from '@/shared/ui/Container'
import { PostsList } from '@/widgets/PostsList'

export const Home = () => {
    return (
        <Container
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
            <PostsList />
        </Container>
    )
}
