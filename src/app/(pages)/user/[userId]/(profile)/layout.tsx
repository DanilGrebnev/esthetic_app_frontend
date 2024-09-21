import { Container } from '@/shared/ui/Container'
import {
    UserPublicProfileHeader,
    UserPublicProfileHeaderSkeleton,
} from '@/widgets/UserPublicProfileHeader'
import type { Metadata } from 'next'
import { type FC, type ReactNode, Suspense } from 'react'

interface UserLayout {
    children: ReactNode
    params: {
        userId: string
    }
}

const UserLayout: FC<UserLayout> = ({ children, params }) => {
    return (
        <Container
            size='l'
            id='User layout'
        >
            <Suspense fallback={<UserPublicProfileHeaderSkeleton />}>
                <UserPublicProfileHeader userId={params.userId} />
            </Suspense>
            {children}
        </Container>
    )
}

export default UserLayout
