import { Container } from '@/shared/ui/Container'
import type { FC, ReactNode } from 'react'

interface ProfileDashboardsLayoutProps {
    children?: ReactNode
    params: {
        userId: string
    }
}

const ProfileDashboardsLayout: FC<ProfileDashboardsLayoutProps> = ({
    children,
}) => {
    return (
        <Container
            id='Profile dashboard page'
            className='flex grow'
        >
            {children}
        </Container>
    )
}

export default ProfileDashboardsLayout
