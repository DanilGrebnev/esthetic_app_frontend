'use client'

import { useGetDetailPostsQuery } from '@/shared/api/posts'
import { CircleButton } from '@/shared/ui/CircleButton'
import { SlidingMenu } from '@/shared/ui/SlidingMenu'

import { DeletePostsBtn } from './DeletePostsBtn'
import { EditPostsBtn } from './EditPostsBtn'
import { MenuPostBtnContext } from './MenuPostBtnContext'

interface MenuPostBtnProps {
    postsId: string
}

export const MenuPostBtn = (props: MenuPostBtnProps) => {
    const { postsId } = props
    const { data: posts, isPending } = useGetDetailPostsQuery(postsId)

    if (isPending) return
    if (!posts?.user?.isOwner) return

    return (
        <MenuPostBtnContext.Provider value={{ postsId }}>
            <SlidingMenu icon={<CircleButton icon='dot' />}>
                <DeletePostsBtn />
                <EditPostsBtn />
            </SlidingMenu>
        </MenuPostBtnContext.Provider>
    )
}
