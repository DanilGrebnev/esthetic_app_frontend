import { CircleButton } from '@/shared/ui/CircleButton'
import { Modal } from '@/shared/ui/modal'
import { FC, useState } from 'react'

import { EditPostsModal } from './EditPostsModal/EditPostsModal'

export const EditPostsBtn = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <CircleButton
                variant='box-shadow'
                icon='edit'
                onClick={() => setOpenModal(true)}
            />
            <Modal
                onClose={() => setOpenModal(false)}
                isOpen={openModal}
            >
                <EditPostsModal />
            </Modal>
        </>
    )
}
