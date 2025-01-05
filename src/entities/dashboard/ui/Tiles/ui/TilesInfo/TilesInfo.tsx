'use client'

import { DotMenu } from '@/shared/ui/DotMenu'
import { Modal } from '@/shared/ui/modal'
import { getDateRange } from '@/shared/utils/getDateRange'
import { stopPropAndPrevDef } from '@/shared/utils/stopPropAndPrevDef'
import clsx from 'clsx'
import { type FC, useCallback, useRef, useState } from 'react'

import { ITilesInfo } from '../../model/tyles-types'
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
    const [openDeleteModal, setOpenModal] = useState(false)
    const [openChangeModal, setOpenChangeDashboardModal] = useState(false)
    const [hoverOnIcon, setHoverOnIcon] = useState(false)

    const openDeleteDashboardModal = useCallback(() => setOpenModal(true), [])
    const closeDeleteDashboardModal = useCallback(() => setOpenModal(false), [])

    const openChangeDashboardModal = useCallback(() => setOpenModal(true), [])
    const closeChangeDashboardModal = useCallback(() => setOpenModal(false), [])

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
                            onMouseEnter={() => setHoverOnIcon(true)}
                            onClick={stopPropAndPrevDef(() => {
                                setOpenDialog((p) => !p)
                            })}
                            className={s['dot-menu']}
                        />
                    )}
                </header>
                <div className={s.footer}>
                    <p className={s.count}>{postsCount} пин</p>
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
                                closeDeleteDashboardModal()
                            }}
                        >
                            Удалить доску
                        </TilesDialog.Item>
                        <TilesDialog.Item>Изменить доску</TilesDialog.Item>
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
                <DeleteDashboardModal onClose={closeChangeDashboardModal} />
            </Modal>
        </>
    )
}
