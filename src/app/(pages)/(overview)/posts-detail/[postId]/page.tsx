import { Container } from '@/shared/ui/Container'

import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: number
    }
}

export default function DetailPosts({ params }: DetailPostsParams) {
    return (
        <Container className={s.page}>
            <div className={s['posts-detail__wrapper']}>
                {params.postId}
                <div className={s['media-content']}></div>
            </div>
        </Container>
    )
}
