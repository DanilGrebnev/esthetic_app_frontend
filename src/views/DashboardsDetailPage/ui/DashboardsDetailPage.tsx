'use client'

import {
    PostsListSkeleton,
    useCalculateColumnsAmountByScreenSize,
} from '@/entities/posts'
import { useGetDashboardsDetail } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { PostsCard } from '@/widgets/PostsCard'
import { useMemo } from 'react'

import s from './DashboardDetailPage.module.scss'
import { PostsAmount } from './PostsAmount'
import { Title } from './Title'
import { AuthorInfo } from './UserInfo'

interface DashboardDetailPageProps {
    params: {
        userId: string
        dashboardsId: string | 'empty-dashboard'
    }
}

export const DashboardDetailPage = ({ params }: DashboardDetailPageProps) => {
    const { userId, dashboardsId } = params
    const columnsAmount = useCalculateColumnsAmountByScreenSize()
    const { data: publicProfile } = useGetPublicProfileQuery({ userId })
    const {
        data: dashboardsDetail,
        fetchNextPage,
        isPending,
    } = useGetDashboardsDetail({
        dashboardsId,
        enabled: dashboardsId !== 'empty-dashboard',
    })

    const dashoardList = useMemo(
        () => dashboardsDetail?.pages.map((page) => page.posts).flat(1),
        [dashboardsDetail?.pages],
    )

    const postsAmount = dashboardsDetail?.pages[0].dashboardInfo.postsAmount

    return (
        <div className={s.container}>
            <Title>
                {dashboardsDetail?.pages[0].dashboardInfo.dashboardName}
            </Title>

            <AuthorInfo
                firstName={publicProfile?.user.firstName}
                lastName={publicProfile?.user.lastName}
                word={publicProfile?.user?.firstName[0].toUpperCase()}
                awatarSrc={publicProfile?.user?.avatar}
            />
            <PostsAmount postsAmount={postsAmount} />
            <div className='grow'>
                {(!dashboardsDetail || isPending) && <PostsListSkeleton />}
                {dashboardsDetail && (
                    <VirtualGrid
                        totalCount={dashoardList?.length}
                        // itemHeight='400px'
                        columnAmount={columnsAmount}
                        endReached={fetchNextPage}
                        enabled={isPending}
                        useWindowScroll
                        gap='10px'
                    >
                        {(index) => {
                            const post = dashoardList?.[index]

                            return (
                                <PostsCard
                                    key={post?.postId}
                                    url={post?.url as string}
                                    urlBlur={post?.url as string}
                                    postId={post?.postId as string}
                                    name={''}
                                />
                            )
                        }}
                    </VirtualGrid>
                )}
            </div>
        </div>
    )
}
