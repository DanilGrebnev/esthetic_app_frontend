import { UserProfileIcon } from '@/features/user'
import { Layout } from '@/shared/types/layout'
import { Container } from '@/shared/ui/Container'
import { FC } from 'react'

import s from './s.module.scss'

const ProfileDashboardsLayout: FC<Layout> = ({ children }) => {
    return (
        <div>
            <Container className={s.layout}>
                <h1 className={s.title}>Cars</h1>
                <div className={s['author-info']}>
                    <UserProfileIcon />
                    <div className={s['author-name']}>Jora Ichanov</div>
                </div>
            </Container>
            {children}
        </div>
    )
}

export default ProfileDashboardsLayout
