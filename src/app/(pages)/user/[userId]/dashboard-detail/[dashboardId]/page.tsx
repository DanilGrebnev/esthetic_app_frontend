'use client'

import { PostsList } from '@/entities/posts'
import { routes } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'
import Link from 'next/link'
import { FC } from 'react'

import s from './s.module.scss'

interface DashboardDetailPageProps {
    params: {
        userId: string
        dashboardId: string
    }
}

const DashboardDetailPage: FC<DashboardDetailPageProps> = ({ params }) => {
    const { userId, dashboardId } = params
    console.log('dashboardId: ', dashboardId)
    console.log('userId: ', userId)

    return (
        <Container className={s['dashboard-detail-container']}>
            <h1 className={s.title}>Cars</h1>
            <div className={s['author-info']}>
                <Link
                    className={s['author-link']}
                    href={routes.userCreatedPosts.getRoute('2281488')}
                >
                    Автор: <span>Jora Ichanov</span>
                </Link>
            </div>
            <h4 className={s['posts-amount']}>1 пост</h4>
            <div className={s['posts-list']}>
                <PostsList />
            </div>
        </Container>
    )
}

export default DashboardDetailPage
