import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import { TPostsList } from '@/shared/types/posts'
import type {
    UserPrivateProfile,
    UserProfile,
    UserPublicProfile,
    UsersLoginBody,
} from '@/shared/types/user'
import { HTTPError } from 'ky'

import { apiInstance } from '../Instance'

class UsersApi {
    private basePath = 'users' as const

    login = (body: UsersLoginBody) => {
        return apiInstance
            .post(`${this.basePath}/login`, {
                json: body,
                credentials: 'include',
            })
            .json<UserProfile>()
    }
    logout = () => {
        return apiInstance.post(`${this.basePath}/logout`, {
            credentials: 'include',
        })
    }
    registration = async (body: FormData) => {
        try {
            return await apiInstance
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
        return apiInstance
            .get(this.basePath + '/public-profile/' + userId, {
                credentials: 'include',
            })
            .json<UserPublicProfile>()
    }
    profileByCookie = () => {
        return apiInstance
            .get(this.basePath + '/private-profile', {
                credentials: 'include',
            })
            .json<UserPrivateProfile>()
    }
    changeProfileData = (formData: FormData) => {
        return apiInstance.put(this.basePath, {
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
        return apiInstance
            .get(this.basePath + '/' + userId + '/created-posts ', {
                signal,
                searchParams,
            })
            .json<TPostsList>()
    }
}

export const usersApi = new UsersApi()
