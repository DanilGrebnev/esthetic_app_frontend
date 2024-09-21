import { UserProfileIcon } from '@/features/user'
import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { FC, ReactNode } from 'react'

import s from './s.module.scss'

interface ProfileDashboardsLayoutProps {
    children?: ReactNode
    params: {
        userId: string
    }
}

const ProfileDashboardsLayout: FC<ProfileDashboardsLayoutProps> = async ({
    children,
    params,
}) => {
    const userProfile = await getUserPublicProfileServerAction(params.userId)

    return (
        <Container className={s.layout}>
            <h1 className={s.title}>Cars</h1>
            <div className={s['author-info']}>
                <UserProfileIcon />
                <div className={s['author-name']}>
                    {userProfile.user.firstName} {userProfile.user.lastName}
                </div>
            </div>
            {children}
        </Container>
    )
}

export default ProfileDashboardsLayout
