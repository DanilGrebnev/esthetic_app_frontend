import { apiInstance } from '@/shared/api/Instance'
import {
    TAnswerOnCommentsBody,
    TCreateCommentsBody,
    TEditCommentsBody,
    TGetCommentsListResponse,
} from '@/shared/types/comments'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'

async function getComments<T>({
    offset,
    limit,
}: {
    offset: number
    limit: number
}): Promise<T> {
    const data = (await import('@/shared/MOCK_DATA.json')).default
    const commentsResponse = {
        commentsAmount: data.length,
        commentsList: data.slice(offset, offset + limit),
    }
    return new Promise((resolve) => {
        resolve(commentsResponse as any)
    })
}

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
            .json<{ postId: string }>()
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
            .json<{ postId: string }>()

    answerOnComments = ({
        postId,
        body,
    }: {
        postId: string
        body: TAnswerOnCommentsBody
    }) =>
        apiInstance(this.baseUrl + `/${postId}`, {
            credentials: 'include',
            json: body,
        }).json<{ postId: string }>()
}

export const commentsApi = new CommentsApi()
