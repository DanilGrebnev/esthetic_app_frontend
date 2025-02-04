'use client'

import { CircleButton } from '@/shared/ui/CircleButton'
import { SlidingMenu } from '@/shared/ui/SlidingMenu'

import { DeletePostsBtn } from './DeletePostsBtn'
import { EditPostsBtn } from './EditPostsBtn'

interface MenuPostBtnProps {
    showBtn: boolean
}

export const MenuPostBtn = (props: MenuPostBtnProps) => {
    const { showBtn } = props
    if (!showBtn) return

    return (
        <SlidingMenu icon={<CircleButton icon='dot' />}>
            <DeletePostsBtn />
            <EditPostsBtn />
        </SlidingMenu>
    )
}
