'use client'

import { CommentariesWriteField } from '@/features/commentaries'
import { consts } from '@/shared/consts'
import { Container } from '@/shared/ui/Container'
import Image from 'next/image'

import { PostsDetailComments } from './PostsDetailComments'
import { PostsDetailHeader } from './PostsDetailHeader'
import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: number
    }
}

export default function DetailPosts({ params }: DetailPostsParams) {
    const pathToImg = consts.pathToImage + 't1.jpg'

    return (
        <Container
            size='m'
            className={s.page}
        >
            <div className={s['content-container']}>
                <div className={s['image-container']}>
                    <Image
                        fill={true}
                        src={pathToImg}
                        alt='test'
                    />
                </div>

                <div className={s.content}>
                    <PostsDetailHeader
                        className={s['content__header']}
                        pathToImg={pathToImg}
                    />
                    <PostsDetailComments
                        count={1}
                        className={s['content__comments']}
                    />
                    <div className={s['write-commentaries']}>
                        <CommentariesWriteField />
                    </div>
                </div>
            </div>
        </Container>
    )
}
