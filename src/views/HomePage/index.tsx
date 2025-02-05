import { Container } from '@/shared/ui/Container'
import { PostsList } from '@/widgets/HomePagePostsList'

export const Home = () => {
    return (
        <Container className='flex flex-col grow'>
            <PostsList />
        </Container>
    )
}
