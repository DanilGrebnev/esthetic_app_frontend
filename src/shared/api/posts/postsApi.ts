import { apiInstance } from '@/shared/api/Instance'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import { TPostsDetail } from '@/shared/types/posts'

class PostsApi {
    baseUrl = 'posts'

    // GET
    /* Возврат всех постов на основе тегов пользователя */
    allPosts = () => {
        return apiInstance.get(this.baseUrl + '/posts', {
            credentials: 'include',
        })
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
    editPost = (postsId: string) => {
        return apiInstance.get(this.baseUrl + '/' + postsId)
    }

    // DELETE
    deletePosts = (postsId: string) => {
        return apiInstance
            .delete(this.baseUrl + '/' + postsId, {
                credentials: 'include',
            })
            .json()
    }
}

export const postsApi = new PostsApi()
