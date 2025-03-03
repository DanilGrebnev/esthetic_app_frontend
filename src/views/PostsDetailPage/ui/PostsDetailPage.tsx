import { CommentsList } from '@/features/commentaries'
import { DeleteCommentsAfterUnmount } from '@/features/commentaries'
import { Container } from '@/shared/ui/Container'
import { NotAuthMessage } from '@/shared/ui/NotAuthMessage'
import { WithAuth } from '@/shared/ui/WithAuth'

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

    return (
        <Container
            size='m'
            className={s.page}
        >
            <InitialSetPostIdInStore postId={postId} />
            <DeleteCommentsAfterUnmount postId={postId} />
            <div id={s.content_container}>
                <PostImage
                    postId={postId}
                    className={s.image}
                />
                <div className={s.content}>
                    <PostsDetailHeader
                        className={s.content__header}
                        postsId={postId}
                    />
                    <CommentsList
                        postId={postId}
                        className={s.content__comments}
                    />

                    <div className={s.write_commentaries}>
                        <WithAuth
                            fallback={
                                <NotAuthMessage prefixText='чтобы оставлять комментарии' />
                            }
                        >
                            <CommentsWriteFielSection />
                        </WithAuth>
                    </div>
                </div>
            </div>
        </Container>
    )
}
