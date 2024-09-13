import { apiInstance } from '@/shared/api/Instance'

class PostsApi {
    baseUrl = 'posts'
    /* Возврат всех постов на основе тегов пользователя */
    allPosts = () => {
        return apiInstance.get(this.baseUrl + '/posts', {
            credentials: 'include',
        })
    }
    /* Создание поста*/
    createPost = () => {
        return apiInstance.post(this.baseUrl + '/posts', {
            credentials: 'include',
        })
    }
    getPostDetail = (postId: string) => {
        return apiInstance.get(this.baseUrl + '/posts/' + postId)
    }
    editPost = (postId: string) => {
        return apiInstance.get(this.baseUrl + '/posts/' + postId)
    }
}

const postsApi = new PostsApi()
