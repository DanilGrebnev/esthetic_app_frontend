'use server'

import { consts } from '@/shared/consts'
import type { UserPublicProfile } from '@/shared/types/user'

export const getUserPublicProfileServerAction = async (
    userId: string,
): Promise<UserPublicProfile> => {
    const res = await fetch(
        consts.baseApiUrl + '/users/public-profile/' + userId,
        { credentials: 'include', cache: 'no-cache' },
    )
    const response = await res.json()

    return response
}
