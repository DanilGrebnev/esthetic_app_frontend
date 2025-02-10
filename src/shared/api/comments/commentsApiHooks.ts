import { useCommentsIdInDeleteQueueList } from '@/features/commentaries/model/hooks/useCommentsIdInDeleteQueueList'
import { consts } from '@/shared/consts'
import { TCommentsItem } from '@/shared/types/comments'
import { setInLocalStorage } from '@/shared/utils/setInLocalStorage'
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { queryKeys } from '../QueryKeys'
import { commentsApi } from './commentsApi'
import { toggleCommentLike } from './lib'

interface IUseGetCommentsListQuery {
    postId: string
    enabled?: boolean
}
export const useGetCommentsListQuery = (args: IUseGetCommentsListQuery) => {
    const { postId, enabled } = args

    return useInfiniteQuery({
        enabled,
        queryKey: [queryKeys.comments.commentsListById(postId)],
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
                queryKey: [queryKeys.comments.commentsListById(postId)],
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
                queryKey: [queryKeys.comments.commentsListById(postId)],
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
                queryKey: [queryKeys.comments.commentsListById(postId)],
            })
        },
    })
}

export const useDeleteCommentsByCommentsIdListMutation = () => {
    const { commentsIdList } = useCommentsIdInDeleteQueueList()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (postId?: string) => {
            await Promise.allSettled(
                commentsIdList.map((commentId) =>
                    commentsApi.deleteComments(commentId),
                ),
            )
            setInLocalStorage(consts.COMMENTS_ID_ON_DELETE_QUEUE_KEY, [])
        },

        onSuccess: (_, postId) => {
            if (postId) {
                queryClient.refetchQueries({
                    queryKey: [queryKeys.comments.commentsListById(postId)],
                })
            }
        },
    })
}

export const useToggleLikeCommentMutation = () => {
    const queryClient = useQueryClient()

    const toggleCommentsLikeMutation = useMutation({
        mutationFn: ({ commentId }: { commentId: string; postId: string }) =>
            commentsApi.toggleLike(commentId),

        onMutate: async ({ postId, commentId }) => {
            await queryClient.cancelQueries({
                queryKey: [queryKeys.comments.commentsListById(postId)],
            })

            const previousComments = queryClient.getQueryData([
                queryKeys.comments.commentsListById(postId),
            ])
            type TOldCache = {
                pageParams: { offset: number; limit: number }[]
                pages: {
                    commentsAmount: number
                    commentsList: TCommentsItem[]
                }[]
            }

            queryClient.setQueryData(
                [queryKeys.comments.commentsListById(postId)],
                (store: TOldCache) => {
                    const mutatedPages = store?.pages.map((page) => ({
                        ...page,
                        commentsList: page.commentsList.map((comment) => {
                            if (comment.commentId !== commentId) {
                                return comment
                            }
                            return toggleCommentLike(comment)
                        }),
                    }))

                    return { ...store, pages: mutatedPages }
                },
            )

            return { previousComments }
        },

        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.comments.commentsListById(postId)],
            })
        },

        onError: (_, { postId }, context) => {
            queryClient.setQueryData(
                [queryKeys.comments.commentsListById(postId)],
                context?.previousComments,
            )
        },
    })

    return toggleCommentsLikeMutation
}
