'use client'

import { Container } from '@/shared/ui/Container'
import { PostsListWithPagination } from '@/widgets/PostsList'
import { type FC } from 'react'

import s from './s.module.scss'

interface DashboardDetailPageProps {
    params: {
        userId: string
        dashboardId: string
    }
}

const DashboardDetailPage: FC<DashboardDetailPageProps> = ({ params }) => {
    const { userId, dashboardId } = params

    return (
        <Container className={s['dashboard-detail-container']}>
            <h4 className={s['posts-amount']}>1 пост</h4>
            <div className={s['posts-list']}>
                <PostsListWithPagination />
            </div>
        </Container>
    )
}

export default DashboardDetailPage
