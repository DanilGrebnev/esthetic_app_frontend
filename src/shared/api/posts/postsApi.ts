import { api } from '@/shared/api/Instance'
import { isErrorResponse } from '@/shared/types/apiResponses'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import type { TPostsDetail, TPostsPreview } from '@/shared/types/posts'

import { createBaseResponse } from '../lib'

class PostsApi {
    baseUrl = 'posts'

    // GET
    /* Возврат всех постов на основе тегов пользователя */
    getPosts = (searchParams: {
        offset: number
        limit: number
        search: string
    }) => {
        return api
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
        return api
            .get(this.baseUrl + `/${postId}`, {
                signal,
                credentials: 'include',
            })
            .json<TPostsDetail>()
    }

    // POST
    /* Создание поста */
    createPost = (formData: FormData) => {
        return api.post(this.baseUrl, {
            credentials: 'include',
            body: formData,
        })
    }

    // PUT
    editPost = async ({
        postsId,
        body,
    }: {
        postsId: string
        body: FormData
    }) => {
        return api
            .put(this.baseUrl + '/' + postsId, {
                body,
                credentials: 'include',
                hooks: {
                    afterResponse: [
                        async (_, __, res) => {
                            if (!res.ok) {
                                try {
                                    const data = await res.json()
                                    if (isErrorResponse(data)) {
                                        return Promise.reject(data)
                                    }
                                } catch (err) {
                                    return Promise.reject(
                                        createBaseResponse(
                                            'Непредвиденная ошибка',
                                            400,
                                        ),
                                    )
                                }
                            }

                            return Promise.resolve(res)
                        },
                    ],
                },
            })
            .json()
    }

    // DELETE
    deletePosts = (postsId: string) => {
        return api
            .delete(this.baseUrl + '/' + postsId, {
                credentials: 'include',
            })
            .json()
    }

    getRecommendedTags = () => {}
}

export const postsApi = new PostsApi()
