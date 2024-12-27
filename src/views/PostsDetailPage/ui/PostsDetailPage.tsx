import { CommentariesWriteField } from '@/features/commentaries'
import { postsApi } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import clsx from 'clsx'

import { PostsDetailComments } from './PostsDetailComments'
import { PostsDetailHeader } from './PostsDetailHeader'
import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: string
    }
}

export const PostsDetailPage = async ({ params }: DetailPostsParams) => {
    const postData = await postsApi.getPostDetail({ postId: params.postId })

    if (!postData) return <h1>Ошибка </h1>
    const { post } = postData

    return (
        <Container
            size='m'
            className={s.page}
        >
            <div className={s['content-container']}>
                <div
                    className={s['image-container']}
                    style={{ aspectRatio: post?.media?.aspectRatio }}
                >
                    <ImageWithBlure
                        fill={true}
                        sizes='400px'
                        quality={100}
                        loading='lazy'
                        alt={post.name}
                        objectFit='cover'
                        src={post?.media?.url}
                        blurDataURL={post?.media?.urlBlur}
                    />
                </div>

                <div className={s.content}>
                    <PostsDetailHeader
                        className={s['content__header']}
                        postsId={post?.postId}
                        title={post.name}
                        description={post?.description}
                        pathToImg={post?.media?.url}
                        author={post?.author}
                    />
                    <PostsDetailComments
                        className={s['content__comments']}
                        count={100_000}
                    />
                    <div className={s['write-commentaries']}>
                        <CommentariesWriteField />
                    </div>
                </div>
            </div>
        </Container>
    )
}
