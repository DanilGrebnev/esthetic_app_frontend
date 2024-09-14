import { Modal } from '@/shared/ui/modal'
import { stopPropAndPrevDef } from '@/shared/utils/stopPropAndPrevDef'
import { forwardRef, useState } from 'react'

import { DeleteDashboardModal } from './DeleteDashboardModal'
import s from './s.module.scss'

export const TilesDialog = forwardRef<HTMLDivElement>((_, ref) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div
            ref={ref}
            className={s.dialog}
            onClick={stopPropAndPrevDef(() => {})}
        >
            <div className={s['dialog-wrapper']}>
                <div
                    onClick={() => setOpenModal(true)}
                    title='Удалить доску'
                    className={s['dialog-item']}
                >
                    Удалить доску
                </div>
                <div
                    title='Редактировать доску'
                    className={s['dialog-item']}
                >
                    Редактировать доску
                </div>
            </div>
            {
                <Modal
                    onClose={() => setOpenModal(false)}
                    isOpen={openModal}
                >
                    <DeleteDashboardModal onClose={() => setOpenModal(false)} />
                </Modal>
            }
        </div>
    )
})

TilesDialog.displayName = 'TilesDialog'
