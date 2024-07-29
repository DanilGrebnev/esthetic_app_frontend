import { AllPostsTile, DashboardTile } from '@/entities/posts'
import { consts } from '@/shared/consts'
import { Container } from '@/shared/ui/Container'

import s from './s.module.scss'

export default function SavedPosts() {
    const arr = Array(5)
        .fill('')
        .map((_, i) => consts.pathToImage + `t${i + 1}.jpg`)

    return (
        <Container className={s['saved-dashboard']}>
            <DashboardTile
                images={arr}
                postsCount='1'
                title='Cars'
                date='1'
            />
            <AllPostsTile
                images={arr}
                title='Все пины'
                postsCount='2'
                date='3'
            />
        </Container>
    )
}
