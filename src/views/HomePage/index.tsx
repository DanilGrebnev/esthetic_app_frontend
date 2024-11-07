import { Container } from '@/shared/ui/Container'
import { RecommendedPostsList } from '@/widgets/RecommendedPostsList'

export const Home = () => {
    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <RecommendedPostsList />
            </div>
        </Container>
    )
}
