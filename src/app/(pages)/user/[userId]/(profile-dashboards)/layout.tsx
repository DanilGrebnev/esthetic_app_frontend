import s from '@/app/(pages)/user/[userId]/(profile-dashboards)/dashboard-detail/[dashboardId]/s.module.scss'
import { UserProfileIcon } from '@/features/user'
import { Layout } from '@/shared/types/layout'
import { Container } from '@/shared/ui/Container'
import { FC } from 'react'

const ProfileDashboardsLayout: FC<Layout> = ({ children }) => {
    return (
        <div>
            <Container>
                <h1 className={s.title}>Cars</h1>
                <div className={s['author-info']}>
                    <UserProfileIcon />
                    <div>Jora Ichanov</div>
                </div>
            </Container>
            {children}
        </div>
    )
}

export default ProfileDashboardsLayout
