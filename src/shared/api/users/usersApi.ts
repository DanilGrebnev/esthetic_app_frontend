import { SuccessResponse } from '@/shared/types/apiResponses'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import { TPostsList } from '@/shared/types/posts'
import type {
    UserPrivateProfile,
    UserProfile,
    UserPublicProfile,
    UsersLoginBody,
} from '@/shared/types/user'
import { HTTPError } from 'ky'

import { api } from '../Instance'

class UsersApi {
    private basePath = 'users' as const

    login = (body: UsersLoginBody) => {
        return api
            .post(`${this.basePath}/login`, {
                json: body,
                credentials: 'include',
            })
            .json<UserProfile>()
    }
    logout = () => {
        return api.post(`${this.basePath}/logout`, {
            credentials: 'include',
        })
    }
    registration = async (body: FormData) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({ message: 'ok', status: 200 })
            }, 2000)
        })

        try {
            return await api
                .post(this.basePath + '/registration', {
                    body,
                })
                .json()
        } catch (err: any) {
            if (err.name === 'HTTPError') {
                throw await (err as HTTPError).response.json()
            }
        }
    }
    publicProfile = (userId: string) => {
        return api
            .get(this.basePath + '/public-profile/' + userId, {
                credentials: 'include',
            })
            .json<UserPublicProfile>()
    }
    profileByCookie = () => {
        return api
            .get(this.basePath + '/private-profile', {
                credentials: 'include',
            })
            .json<UserPrivateProfile>()
    }
    changeProfileData = (formData: FormData) => {
        return api.put(this.basePath, {
            credentials: 'include',
            body: formData,
        })
    }
    getAllCreatedUsersPosts = (
        args: ArgsWithSignal<{
            userId: string
            searchParams: { offset: number; limit: number }
        }>,
    ) => {
        const { signal, userId, searchParams } = args
        return api
            .get(this.basePath + '/' + userId + '/created-posts ', {
                signal,
                searchParams,
            })
            .json<TPostsList>()
    }

    deleteProfileAvatar = (_: any) => {
        return api
            .delete(this.basePath + '/avatar', { credentials: 'include' })
            .json<SuccessResponse>()
    }
}

export const usersApi = new UsersApi()
