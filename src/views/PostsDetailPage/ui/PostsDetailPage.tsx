import { CommentsList } from '@/features/commentaries'
import { DeleteCommentsAfterUnmount } from '@/features/commentaries'
import { postsApi } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'

import { CommentsWriteFielSection } from './CommentsWriteFieldSection'
import { InitialSetPostIdInStore } from './InitialSetPostIdInStore'
import { PostImage } from './PostImage'
import { PostsDetailHeader } from './PostsDetailHeader'
import s from './s.module.scss'

interface DetailPostsParams {
    params: Promise<{
        postId: string
    }>
}

export const PostsDetailPage = async ({ params }: DetailPostsParams) => {
    const { postId } = await params
    const postData = await postsApi.getPostDetail({ postId })

    if (!postData) return <h1>Ошибка </h1>
    const { post } = postData

    return (
        <Container
            size='m'
            className={s.page}
        >
            <InitialSetPostIdInStore postId={postId} />
            <DeleteCommentsAfterUnmount postId={postId} />
            <div id={s['content-container']}>
                <PostImage
                    aspectRatio={post?.media?.aspectRatio}
                    name={post.name}
                    url={post.media.url}
                    urlBlur={post.media.urlBlur}
                    className={s.image}
                />
                <div className={s.content}>
                    <PostsDetailHeader
                        className={s['content__header']}
                        postsId={post?.postId}
                        title={post.name}
                        description={post?.description}
                        pathToImg={post?.media?.url}
                        author={post?.author}
                        link={post?.link}
                    />
                    <CommentsList
                        postId={postId}
                        className={s['content__comments']}
                    />

                    <div className={s['write-commentaries']}>
                        <CommentsWriteFielSection />
                    </div>
                </div>
            </div>
        </Container>
    )
}
