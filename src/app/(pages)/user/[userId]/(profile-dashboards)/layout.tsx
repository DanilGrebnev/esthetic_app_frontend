import { Container } from '@/shared/ui/Container'
import { FC, ReactNode } from 'react'

interface ProfileDashboardsLayoutProps {
    children?: ReactNode
    params: {
        userId: string
    }
}

const ProfileDashboardsLayout: FC<ProfileDashboardsLayoutProps> = ({
    children,
}) => {
    return <Container>{children}</Container>
}

export default ProfileDashboardsLayout
