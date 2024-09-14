import { useDeleteDashboardMutation } from '@/shared/api/dashboards'
import { Button } from '@/shared/ui/Button'
import { TileContext } from '@/shared/ui/Tiles/tileContext'
import { BaseModalWindow } from '@/shared/ui/modal'
import { FC, useContext, useEffect } from 'react'

interface DeleteDashboardModalModalProps {
    onClose: () => void
}
export const DeleteDashboardModal: FC<DeleteDashboardModalModalProps> = ({
    onClose,
}) => {
    const { dashboardId } = useContext(TileContext)
    const { mutateAsync, isPending } = useDeleteDashboardMutation()

    const deleteDashboard = () => {
        mutateAsync(dashboardId)
    }

    return (
        <BaseModalWindow>
            <h3>Удалить доску?</h3>
            <div style={{ display: 'flex', gap: 'var(--global-gap)' }}>
                <Button
                    loading={isPending}
                    onClick={deleteDashboard}
                >
                    Удалить
                </Button>
                <Button
                    disabled={isPending}
                    onClick={onClose}
                >
                    Отмена
                </Button>
            </div>
        </BaseModalWindow>
    )
}
