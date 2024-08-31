'use server'

import { TPostsCard } from '@/shared/types/posts'
import { getRandomElementFromArray } from '@/shared/utils/getRandomElementFromArr'

const randomTime = [1000, 1500, 1800, 2000, 2300, 2500, 2800, 3000, 3200, 3500]

export const getPosts = async (
    offset: number,
    limit: number,
): Promise<TPostsCard[] | []> => {
    const { mockPosts } = await import('./mock')
    if (offset >= mockPosts.length) return []

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPosts.slice(offset + 1, limit))
        }, getRandomElementFromArray(randomTime))
    })
}
