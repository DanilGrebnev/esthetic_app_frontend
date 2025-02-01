import { Container } from '@/shared/ui/Container'
import type { ReactNode } from 'react'

interface ProfileDashboardsLayoutProps {
    children?: ReactNode
}

const ProfileDashboardsLayout = ({
    children,
}: ProfileDashboardsLayoutProps) => {
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
