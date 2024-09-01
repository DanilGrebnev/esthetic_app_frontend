import { PostsListSkeleton } from '@/entities/posts'

const Loading = () => {
    return <PostsListSkeleton withMasonryContainer={true} />
}

export default Loading
