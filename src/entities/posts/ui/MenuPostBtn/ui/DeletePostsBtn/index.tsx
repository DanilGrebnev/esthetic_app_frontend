import { CircleButton } from '@/shared/ui/CircleButton'
import { Modal } from '@/shared/ui/modal'
import { FC, useState } from 'react'

import { DeletePostsModal } from './DeletePostsModal/DeletePostsModal'

export const DeletePostsBtn: FC = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <CircleButton
                variant='box-shadow'
                icon='delete'
                onClick={() => setOpenModal(true)}
            />
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <DeletePostsModal onClose={() => setOpenModal(false)} />
            </Modal>
        </>
    )
}
