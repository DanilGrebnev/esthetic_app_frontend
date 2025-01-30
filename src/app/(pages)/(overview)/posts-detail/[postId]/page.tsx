import { postsApi } from '@/shared/api/posts'

export async function generateMetadata({
    params,
}: {
    params: { postId: string }
}) {
    const { postId } = await params
    const postData = await postsApi.getPostDetail({ postId })

    return {
        title: postData?.post?.name,
        description: postData?.post?.description,
    }
}

export { PostsDetailPage as default } from '@/views/PostsDetailPage'
