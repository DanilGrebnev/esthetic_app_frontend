import { Container } from '@/shared/ui/Container'
import {
    UserPublicProfileHeader,
    UserPublicProfileHeaderSkeleton,
} from '@/widgets/UserPublicProfileHeader'
import { type ReactNode, Suspense } from 'react'

import s from './profile-layout.module.scss'

interface UserLayout {
    children: ReactNode
    params: Promise<{
        userId: string
    }>
}

const UserLayout = async ({ children, params }: UserLayout) => {
    const { userId } = await params

    return (
        <Container
            size='l'
            id='Profile layout'
            className={s.profile_container}
        >
            <Suspense fallback={<UserPublicProfileHeaderSkeleton />}>
                <UserPublicProfileHeader userId={userId} />
            </Suspense>
            {children}
        </Container>
    )
}

export default UserLayout
