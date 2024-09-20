'use client'

import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { DotMenu } from '@/shared/ui/DotMenu'
import { Modal } from '@/shared/ui/modal'
import { stopPropAndPrevDef } from '@/shared/utils/stopPropAndPrevDef'
import clsx from 'clsx'
import { type FC, useRef, useState } from 'react'

import { ITilesInfo } from '../../model/tyles-types'
import { DeleteDashboardModal } from './DeleteDashboardModal'
import { TilesDialog } from './TilesDialog'
import s from './s.module.scss'

interface TilesInfo extends ITilesInfo {
    className?: string
    dotMenu?: boolean
}

export const TilesInfo: FC<TilesInfo> = (props) => {
    const { className, date, title, postsCount, dotMenu = false } = props
    const [openDialog, setOpenDialog] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const closeDialogRef = useRef(() => setOpenDialog(false))

    const openDeleteDashboardModalRef = useRef(() => setOpenModal(true))
    const closeDeleteDashboardModalRef = useRef(() => setOpenModal(false))

    const { elementRef } = useOutsideClick({
        handler: () => setOpenDialog(false),
        attached: openDialog,
    })

    return (
        <>
            <div className={clsx(s['tiles-info'], className)}>
                <header className={s.header}>
                    <h5
                        title={title}
                        className={s.title}
                    >
                        {title}
                    </h5>
                    {dotMenu && (
                        <DotMenu
                            onClick={stopPropAndPrevDef(() => {
                                setOpenDialog((p) => !p)
                            })}
                            className={s['dot-menu']}
                        />
                    )}
                </header>
                <div className={s.footer}>
                    <p className={s.count}>{postsCount} пин</p>
                    <p className={s.date}>{date} нед.</p>
                </div>
                {openDialog && (
                    <TilesDialog.Container ref={elementRef}>
                        <TilesDialog.Item
                            onClick={() => {
                                openDeleteDashboardModalRef.current()
                                closeDialogRef.current()
                            }}
                        >
                            Удалить доску
                        </TilesDialog.Item>
                        <TilesDialog.Item>Изменить доску</TilesDialog.Item>
                    </TilesDialog.Container>
                )}
            </div>
            <Modal
                isOpen={openModal}
                onClose={closeDeleteDashboardModalRef.current}
            >
                <DeleteDashboardModal
                    onClose={closeDeleteDashboardModalRef.current}
                />
            </Modal>
        </>
    )
}
