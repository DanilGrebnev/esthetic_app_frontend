import { Container } from '@/shared/ui/Container'
import {
    UserPublicProfileHeader,
    UserPublicProfileHeaderSkeleton,
} from '@/widgets/UserPublicProfileHeader'
import { type ReactNode, Suspense } from 'react'

interface UserLayout {
    children: ReactNode
    params: {
        userId: string
    }
}

const UserLayout = ({ children, params }: UserLayout) => {
    return (
        <Container
            size='l'
            id='Profile layout'
            className='flex flex-col grow'
        >
            <Suspense fallback={<UserPublicProfileHeaderSkeleton />}>
                <UserPublicProfileHeader userId={params.userId} />
            </Suspense>
            {children}
        </Container>
    )
}

export default UserLayout
