'use client'

import { DotMenu } from '@/shared/ui/DotMenu'
import { Modal } from '@/shared/ui/modal'
import { getDateRange } from '@/shared/utils/getDateRange'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

import { ITilesInfo } from '../../model/tyles-types'
import { ChangeDashboardModal } from './ChangeDashboardModal'
import { DeleteDashboardModal } from './DeleteDashboardModal'
import { TilesDialog } from './TilesDialog'
import s from './s.module.scss'

interface TilesInfo extends ITilesInfo {
    className?: string
    dotMenu?: boolean
}

export const TilesInfo = (props: TilesInfo) => {
    const { className, date, title, postsCount, dotMenu = false } = props
    const [openDialog, setOpenDialog] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openChangeModal, setOpenChangeDashboardModal] = useState(false)
    const [hoverOnIcon, setHoverOnIcon] = useState(false)

    const openDeleteDashboardModal = useCallback(
        () => setOpenDeleteModal(true),
        [],
    )
    const closeDeleteDashboardModal = useCallback(
        () => setOpenDeleteModal(false),
        [],
    )

    const openChangeDashboardModal = useCallback(
        () => setOpenChangeDashboardModal(true),
        [],
    )
    const closeChangeDashboardModal = useCallback(
        () => setOpenChangeDashboardModal(false),
        [],
    )

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
                            className={s['dot-menu']}
                            onMouseEnter={() => setHoverOnIcon(true)}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setOpenDialog((p) => !p)
                            }}
                        />
                    )}
                </header>
                <div className={s.footer}>
                    <p className={s.count}>{postsCount} постов</p>
                    <p className={s.date}>{getDateRange(date)}</p>
                </div>
                {hoverOnIcon && (
                    <TilesDialog.Container
                        onClose={() => setOpenDialog(false)}
                        open={openDialog}
                    >
                        <TilesDialog.Item
                            onClick={() => {
                                openDeleteDashboardModal()
                            }}
                        >
                            Удалить доску
                        </TilesDialog.Item>
                        <TilesDialog.Item onClick={openChangeDashboardModal}>
                            Изменить доску
                        </TilesDialog.Item>
                    </TilesDialog.Container>
                )}
            </div>
            <Modal
                isOpen={openDeleteModal}
                onClose={closeDeleteDashboardModal}
            >
                <DeleteDashboardModal onClose={openDeleteDashboardModal} />
            </Modal>
            <Modal
                isOpen={openChangeModal}
                onClose={closeChangeDashboardModal}
            >
                <ChangeDashboardModal />
            </Modal>
        </>
    )
}
