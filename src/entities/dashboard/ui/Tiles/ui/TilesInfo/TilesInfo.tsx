'use client'

import { useGetDashboardContext } from '@/entities/dashboard/model/dashboardContext'
import { DotMenu } from '@/shared/ui/DotMenu'
import { Modal } from '@/shared/ui/modal'
import { getDateRange } from '@/shared/utils/getDateRange'
import clsx from 'clsx'

import { ChangeDashboardModal } from '../../../ChangeDashboardModal'
import { DeleteDashboardModal } from '../../../DeleteDashboardModal'
import { useTilesStore } from '../../model/tilesStore'
import { ITilesInfo } from '../../model/tyles-types'
import { TilesDialog } from './TilesDialog'
import s from './s.module.scss'

interface TilesInfo extends ITilesInfo {
    className?: string
    dotMenu?: boolean
}

export const TilesInfo = (props: TilesInfo) => {
    const { className, date, title, postsCount, dotMenu = false } = props
    const [state, actions] = useTilesStore()
    const { hoverOnIcon, openChangeModal, openDeleteModal, openDialog } = state
    const {
        setHoverOnIcon,
        setOpenChangeDashboardModal,
        setOpenDeleteModal,
        setOpenDialog,
    } = actions
    const { dashboardId, dashboardName } = useGetDashboardContext()

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
                    <p className={s.count}>постов: {postsCount}</p>
                    <p className={s.date}>{getDateRange(date)}</p>
                </div>
                {hoverOnIcon && (
                    <TilesDialog.Container
                        onClose={() => setOpenDialog(false)}
                        open={openDialog}
                    >
                        <TilesDialog.Item
                            onClick={() => setOpenDeleteModal(true)}
                        >
                            Удалить доску
                        </TilesDialog.Item>
                        <TilesDialog.Item
                            onClick={() => setOpenChangeDashboardModal(true)}
                        >
                            Изменить доску
                        </TilesDialog.Item>
                    </TilesDialog.Container>
                )}
            </div>
            <Modal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
            >
                <DeleteDashboardModal
                    dashboardId={dashboardId}
                    onClose={() => setOpenDeleteModal(false)}
                />
            </Modal>
            <Modal
                isOpen={openChangeModal}
                onClose={() => setOpenChangeDashboardModal(false)}
            >
                <ChangeDashboardModal
                    dashboardName={dashboardName}
                    dashboardId={dashboardId}
                />
            </Modal>
        </>
    )
}
