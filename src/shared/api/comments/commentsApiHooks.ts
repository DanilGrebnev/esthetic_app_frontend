import {
    useFilterCommentIdInQueueDeleteListSelector,
    useGetCommentIdQueueDeleteListSelector,
} from '@/features/commentaries/model/store/commentsStoreSelectors'
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

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
            commentsApi.getCommentsList({ signal, pageParam, postId }),
        getNextPageParam: (_, allPages, { limit, offset }) => {
            const commentsOnLastPage = allPages.at(-1)?.commentsList.length

            if (commentsOnLastPage && limit > commentsOnLastPage) return

            return { offset: offset + limit, limit }
        },
        initialPageParam: { offset: 0, limit: 50 },
    })
}

export const useCreateCommentsMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: commentsApi.createComments,
        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.comments.commentsList(postId)],
            })
        },
    })
}

export const useEditCommentsMutations = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: commentsApi.editComments,
        onSuccess: ({ postId }) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.comments.commentsList(postId)],
            })
        },
    })
}

export const useAnswerCommentsMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: commentsApi.answerOnComments,
        onSuccess: ({ postId }) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.comments.commentsList(postId)],
            })
        },
    })
}

export const useDeleteCommentsMutation = (postId: string) => {
    const queryClient = useQueryClient()
    const commentsIdList = useGetCommentIdQueueDeleteListSelector()
    const deleteCommentIdFrom = useFilterCommentIdInQueueDeleteListSelector()

    return useMutation({
        mutationFn: () => {
            if (![...commentsIdList].length) return Promise.reject()

            const promises = [...commentsIdList].map((commentId) => {
                deleteCommentIdFrom(commentId)
                return commentsApi.deleteComments(commentId)
            })
            return Promise.allSettled(promises)
        },

        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.comments.commentsList(postId)],
            })
        },
    })
}
