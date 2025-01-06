import { apiInstance } from '@/shared/api/Instance'
import type {
    TAnswerOnCommentsBody,
    TAnswerOnCommentsResponse,
    TCreateCommentsBody,
    TCreateCommentsResponse,
    TDeleteCommentsResponse,
    TEditCommentsBody,
    TEditCommentsResponse,
    TGetCommentsListResponse,
} from '@/shared/types/comments'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'

class CommentsApi {
    private readonly baseUrl = 'comments' as const

    getCommentsList = (
        args: ArgsWithSignal<{
            pageParam: { offset: number; limit: number }
            postId: string
        }>,
    ) => {
        const { pageParam, signal, postId } = args
        return apiInstance
            .get(this.baseUrl + `/${postId}`, {
                signal,
                searchParams: pageParam,
                credentials: 'include',
            })
            .json<TGetCommentsListResponse>()
    }
    createComments = ({
        postId,
        body,
    }: {
        postId: string
        body: TCreateCommentsBody
    }) => {
        return apiInstance
            .post(this.baseUrl + `/${postId}`, {
                json: body,
                credentials: 'include',
            })
            .json<TCreateCommentsResponse>()
    }

    editComments = ({
        commentId,
        body,
    }: {
        commentId: string
        body: TEditCommentsBody
    }) =>
        apiInstance
            .put(this.baseUrl + `/${commentId}`, {
                json: body,
                credentials: 'include',
            })
            .json<TEditCommentsResponse>()

    answerOnComments = ({
        postId,
        body,
    }: {
        postId: string
        body: TAnswerOnCommentsBody
    }) =>
        apiInstance
            .post(this.baseUrl + `/${postId}`, {
                credentials: 'include',
                json: body,
            })
            .json<TAnswerOnCommentsResponse>()

    deleteComments = (commentId: string) =>
        apiInstance
            .delete(this.baseUrl + `/${commentId}`, {
                credentials: 'include',
            })
            .json<TDeleteCommentsResponse>()

    toggleLike = (commentId: string) =>
        apiInstance
            .put(this.baseUrl + '/toggle-like' + `/${commentId}`, {
                credentials: 'include',
            })
            .json()
}

export const commentsApi = new CommentsApi()
