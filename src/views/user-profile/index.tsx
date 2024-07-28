import { AllPostsTile, DashboardTile } from '@/entities/posts'
import { consts } from '@/shared/consts'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'

import s from './s.module.scss'

export const Profile = () => {
    const arr = Array(5)
        .fill('')
        .map((_, i) => consts.pathToImage + `t${i + 1}.jpg`)

    return (
        <Container className={s.profile}>
            <header className={s['user-header']}>
                <div className={s.avatar}>Д</div>
                <p className={s['full-name']}>Данил Гребнев</p>
                <p className={s['username']}>danilgrebnev60</p>
                <p className={s.subscriptions}>0 подписок</p>
            </header>
            <div className={s['btn-group']}>
                <Button variant='silver'>Поделиться</Button>
                <Button variant='silver'>Изменить</Button>
            </div>

            <div className={s['saved-dashboard']}>
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
            </div>
        </Container>
    )
}
