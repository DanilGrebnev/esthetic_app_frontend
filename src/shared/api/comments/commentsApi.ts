import { apiInstance } from '@/shared/api/Instance'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'

class CommentsApi {
    readonly baseUrl = 'comments' as const

    getCommentsList = (
        args: ArgsWithSignal<{
            pageParam: { offset: number; limit: number }
        }>,
    ) => {
        const { pageParam, signal } = args

        return apiInstance
            .get(this.baseUrl, {
                signal,
                searchParams: pageParam,
            })
            .json<GetCommentsListResponseType>()
    }
}

export const commentsApi = new CommentsApi()
