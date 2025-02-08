import { Container } from '@/shared/ui/Container'
import { HomePagePostsList } from '@/widgets/HomePagePostsList'

export const Home = () => {
    return (
        <Container className='flex flex-col grow'>
            <HomePagePostsList />
        </Container>
    )
}
