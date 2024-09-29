'use server'

import { routes } from '@/shared/routes'
import { revalidatePath } from 'next/cache'

export const revalidatePostsDetailPage = async (postsId: string) => {
    revalidatePath(routes.postsDetail.getRoute(postsId))
}
