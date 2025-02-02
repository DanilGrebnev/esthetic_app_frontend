'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetDashboardsDetail } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { PostsCard } from '@/widgets/PostsCard'
import { use } from 'react'

import s from './DashboardDetailPage.module.scss'
import { PostsAmount } from './PostsAmount'
import { Title } from './Title'
import { AuthorInfo } from './UserInfo'

interface DashboardDetailPageProps {
    params: Promise<{
        userId: string
        dashboardsId: string | 'empty-dashboard'
    }>
}

export const DashboardDetailPage = ({ params }: DashboardDetailPageProps) => {
    const { userId, dashboardsId } = use(params)

    const { data: publicProfile } = useGetPublicProfileQuery({ userId })
    const { data, fetchNextPage, isPending } = useGetDashboardsDetail({
        dashboardsId,
        enabled: dashboardsId !== 'empty-dashboard',
    })

    const posts = data?.pages.map((page) => page.posts).flat(1)
    const postsAmount = data?.pages[0].dashboardInfo.postsAmount

    return (
        <div className={s.container}>
            <Title>{data?.pages[0].dashboardInfo.dashboardName}</Title>

            <AuthorInfo
                firstName={publicProfile?.user.firstName}
                lastName={publicProfile?.user.lastName}
                word={publicProfile?.user?.firstName[0].toUpperCase()}
                awatarSrc={publicProfile?.user?.avatar}
            />
            <PostsAmount postsAmount={postsAmount} />
            <PostsListRender
                data={posts}
                endReached={fetchNextPage}
                useWindowScroll={true}
                loading={isPending}
                zeroDataTitle='В доске нет постов'
                render={({ postId, url, urlBlur }) => (
                    <PostsCard
                        name={''}
                        url={url}
                        urlBlur={urlBlur}
                        postId={postId}
                    />
                )}
            />
        </div>
    )
}
