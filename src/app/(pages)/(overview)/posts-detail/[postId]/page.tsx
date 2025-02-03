import { postsApi } from '@/shared/api/posts'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params
    let postData
    try {
        postData = await postsApi.getPostDetail({ postId })
    } catch (err) {
        return {
            title: 'Ошибка получения поста',
            description: 'Ошибка получения описания поста',
        }
    }

    return {
        title: postData?.post?.name,
        description: postData?.post?.description,
    }
}

export { PostsDetailPage as default } from '@/views/PostsDetailPage'
