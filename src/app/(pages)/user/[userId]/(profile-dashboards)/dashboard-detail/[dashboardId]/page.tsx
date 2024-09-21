'use client'

import { DashboardsContainer } from '@/entities/dashboard'
import { useGetDashboardsDetail } from '@/shared/api/dashboards'
import { Container } from '@/shared/ui/Container'
import { PostsListWithPagination } from '@/widgets/PostsList'
import { type FC, useEffect } from 'react'

import s from './s.module.scss'

interface DashboardDetailPageProps {
    params: {
        userId: string
        dashboardId: string
    }
}

const DashboardDetailPage: FC<DashboardDetailPageProps> = ({ params }) => {
    const { userId, dashboardId } = params

    const { data: dashboardsList } = useGetDashboardsDetail(dashboardId)

    // useEffect(() => {
    //     console.log('dashboardId >>', dashboardId)
    //     console.log('dashboardsList >>', dashboardsList)
    // }, [dashboardId, dashboardsList])

    return (
        <Container className={s['dashboard-detail-container']}>
            <h4 className={s['posts-amount']}>1 пост</h4>
            <div className={s['posts-list']}>
                {/*<DashboardsContainer></DashboardsContainer>*/}
                <PostsListWithPagination />
            </div>
        </Container>
    )
}

export default DashboardDetailPage
