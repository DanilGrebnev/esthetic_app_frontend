import { PostsListSkeleton } from '@/entities/posts'

import { PostsListWithPagination as PostsList } from './PostsListWithPagination'

export const PostsListWithPagination = () => {
    return (
        <PostsList>
            <PostsListSkeleton withMasonryContainer={false} />
        </PostsList>
    )
}
