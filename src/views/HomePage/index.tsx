import { Container } from '@/shared/ui/Container'
import { PostsList } from '@/widgets/HomePagePostsList'

export const Home = () => {
    return (
        <Container
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
            <PostsList />
        </Container>
    )
}
