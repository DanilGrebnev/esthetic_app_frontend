'use server'

import { consts } from '@/shared/consts'
import type { UserPublicProfile } from '@/shared/types/user'

export const getUserPublicProfileServerAction = async (
    userId: string,
): Promise<UserPublicProfile> => {
    console.clear()
    console.log(consts.baseApiUrl)
    const res = await fetch(
        consts.baseApiUrl + '/users/public-profile/' + userId,
        { credentials: 'include' },
    )
    const json = await res.json()
    console.log(json)
    return json
}
