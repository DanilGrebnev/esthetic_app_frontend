'use client'

import { DashboardsContainer } from '@/entities/dashboard'
import { UserProfileIcon } from '@/features/user'
import { useGetDashboardsDetail } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

import s from './DashboardDetailPage.module.scss'

interface DashboardDetailPageProps {
    params: {
        userId: string
        dashboardsId: string
    }
}

export const DashboardDetailPage: FC<DashboardDetailPageProps> = ({
    params,
}) => {
    const { userId, dashboardsId } = params

    const { data: publicProfile } = useGetPublicProfileQuery({ userId })

    const { data: dashboardsDetail } = useGetDashboardsDetail({
        dashboardsId,
    })

    return (
        <Container className={s.container}>
            <h1 className={s.title}>
                {dashboardsDetail?.dashboardInfo?.dashboardName}
            </h1>
            <div className={s['author-info']}>
                <UserProfileIcon />
                <div className={s['author-name']}>
                    {publicProfile?.user.firstName}
                    {publicProfile?.user.lastName}
                </div>
            </div>
            <h4 className={s['posts-amount']}>
                Количество постов: {dashboardsDetail?.postsAmount}
            </h4>
            <div className={s['posts-list']}>
                <DashboardsContainer>
                    {dashboardsDetail?.posts.map((post) => {
                        return (
                            <PostsCard
                                key={post.postId}
                                mediaUrl={post.url}
                                name={''}
                                postId={post.postId}
                            />
                        )
                    })}
                </DashboardsContainer>
            </div>
        </Container>
    )
}
