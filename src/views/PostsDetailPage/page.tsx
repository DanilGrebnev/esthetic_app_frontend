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
    const { data: postData, isPending } = useGetDetailPostsQuery(params.postId)

    if (isPending || !postData) {
        return <h1>Загрузка поста...</h1>
    }

    const { post, user } = postData

    return (
        <Container
            size='m'
            className={s.page}
        >
            <div className={s['content-container']}>
                <div className={s['image-container']}>
                    <Image
                        fill={true}
                        alt={post.name}
                        src={post?.media?.url}
                    />
                </div>

                <div className={s.content}>
                    <PostsDetailHeader
                        title={post.name}
                        description={post?.description}
                        className={s['content__header']}
                        authorAvatar={post.author.avatar}
                        pathToImg={post?.media?.url}
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
