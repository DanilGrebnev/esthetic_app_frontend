import { AllPostsTile, DashboardTile } from '@/entities/posts'
import { consts } from '@/shared/consts'
import { routes } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'

import s from './s.module.scss'

export default function SavedPosts() {
    const arr = Array(5)
        .fill('')
        .map((_, i) => consts.pathToImage + `t${i + 1}.jpg`)

    return (
        <Container className={s['saved-dashboard']}>
            <AllPostsTile
                href={routes.userAllSavedPosts.getRoute('321')}
                images={arr}
                title='Все посты'
                postsCount='2'
                date='3'
            />
            <DashboardTile
                href={routes.userDashboardDetail.getRoute(
                    'future-user-id',
                    'dashboard-id',
                )}
                images={arr}
                postsCount='1'
                title='Машины'
                date='1'
            />
        </Container>
    )
}
