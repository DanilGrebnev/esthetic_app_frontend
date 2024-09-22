'use client'

import { useGetDetailPostsQuery } from '@/shared/api/posts'
import { CircleButton } from '@/shared/ui/CircleButton'
import { SlidingMenu } from '@/shared/ui/SlidingMenu'
import { Modal } from '@/shared/ui/modal'
import { type FC, useState } from 'react'

import { DeletePostsModal } from './DeletePostsModal/DeletePostsModal'

interface MenuPostBtnProps {
    postsId: string
}

export const MenuPostBtn: FC<MenuPostBtnProps> = (props) => {
    const { postsId } = props
    const { data: posts, isPending } = useGetDetailPostsQuery(postsId)

    const [openModal, setOpenModal] = useState(false)

    if (isPending) return
    if (!posts?.user.isOwner) return

    return (
        <>
            <SlidingMenu icon={<CircleButton icon='dot' />}>
                <CircleButton
                    variant={'box-shadow'}
                    icon='delete'
                    onClick={() => setOpenModal(true)}
                />
                <CircleButton
                    variant={'box-shadow'}
                    icon='edit'
                />
            </SlidingMenu>
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <DeletePostsModal
                    postsId={postsId}
                    onClose={() => setOpenModal(false)}
                />
            </Modal>
        </>
    )
}
