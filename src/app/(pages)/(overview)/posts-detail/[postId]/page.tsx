import { postsApi } from '@/shared/api/posts'

export async function generateMetadata({
    params,
}: {
    params: { postId: string }
}) {
    const postData = await postsApi.getPostDetail({ postId: params.postId })

    return {
        title: postData?.post?.name,
        description: postData?.post?.description,
    }
}

export { PostsDetailPage as default } from '@/views/PostsDetailPage'
