import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import { TPostsList } from '@/shared/types/posts'
import type {
    UserPrivateProfile,
    UserProfile,
    UserPublicProfile,
    UsersLoginBody,
} from '@/shared/types/user'

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
    registration = (body: FormData) => {
        return apiInstance
            .post(`${this.basePath}/registration`, { body })
            .json()
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

    getAllCreatedUsersPosts = (args: ArgsWithSignal<{ userId: string }>) => {
        const { signal, userId } = args
        return apiInstance
            .get(this.basePath + '/' + userId + '/created-posts ', {
                signal,
            })
            .json<TPostsList>()
    }
}

export const usersApi = new UsersApi()
