import { apiInstance } from '@/shared/api/Instance'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import type { TPostsDetail, TPostsPreview } from '@/shared/types/posts'

class PostsApi {
    baseUrl = 'posts'

    // GET
    /* Возврат всех постов на основе тегов пользователя */
    getPosts = (searchParams: {
        offset: number
        limit: number
        search: string
    }) => {
        return apiInstance
            .get(this.baseUrl, {
                credentials: 'include',
                searchParams,
            })
            .json<{ postsAmount: number; posts: TPostsPreview[] }>()
    }

    /* Получение детальной информации о посте */
    getPostDetail = ({
        postId,
        signal,
    }: ArgsWithSignal<{ postId: string }>) => {
        return apiInstance
            .get(this.baseUrl + `/${postId}`, {
                signal,
                credentials: 'include',
            })
            .json<TPostsDetail>()
    }

    // POST
    /* Создание поста */
    createPost = (formData: FormData) => {
        return apiInstance.post(this.baseUrl, {
            credentials: 'include',
            body: formData,
        })
    }

    // PUT
    editPost = ({ postsId, body }: { postsId: string; body: FormData }) => {
        return apiInstance
            .put(this.baseUrl + '/' + postsId, { body, credentials: 'include' })
            .json()
    }

    // DELETE
    deletePosts = (postsId: string) => {
        return apiInstance
            .delete(this.baseUrl + '/' + postsId, {
                credentials: 'include',
            })
            .json()
    }

    getRecommendedTags = () => {}
}

export const postsApi = new PostsApi()
