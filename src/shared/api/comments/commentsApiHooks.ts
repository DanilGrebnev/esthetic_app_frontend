import { useInfiniteQuery } from '@tanstack/react-query'

import { queryKeys } from '../QueryKeys'
import { commentsApi } from './commentsApi'

interface IUseGetCommentsListQuery {
    postId: string
    enabled?: boolean
}
export const useGetCommentsListQuery = (args: IUseGetCommentsListQuery) => {
    const { postId, enabled } = args

    return useInfiniteQuery({
        enabled,
        queryKey: [queryKeys.comments.commentsList(postId)],
        queryFn: ({ pageParam, signal }) =>
            commentsApi.getCommentsList({ signal, pageParam }),
        getNextPageParam: (_, __, { limit, offset }) => ({
            offset: offset + limit,
            limit,
        }),
        initialPageParam: { offset: 0, limit: 50 },
    })
}
