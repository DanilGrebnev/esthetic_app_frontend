'use client'

import { CommentariesWriteField } from '@/features/commentaries'
import { useGetDetailPostsQuery } from '@/shared/api/posts/postsApiHooks'
import { consts } from '@/shared/consts'
import { Container } from '@/shared/ui/Container'
import Image from 'next/image'

import { PostsDetailComments } from './PostsDetailComments'
import { PostsDetailHeader } from './PostsDetailHeader'
import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: string
    }
}

export const PostsDetailPage = ({ params }: DetailPostsParams) => {
    const pathToImg = consts.pathToImage + 't1.jpg'
    const { data: post, isPending } = useGetDetailPostsQuery(params.postId)

    if (isPending) {
        return <h1>Загрузка поста...</h1>
    }

    return (
        <Container
            size='m'
            className={s.page}
        >
            <div className={s['content-container']}>
                <div className={s['image-container']}>
                    <Image
                        alt='test'
                        fill={true}
                        src={post?.media?.url || pathToImg}
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
