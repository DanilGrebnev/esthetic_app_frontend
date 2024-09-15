import { useDeleteDashboardMutation } from '@/shared/api/dashboards'
import { Button } from '@/shared/ui/Button'
import { TileContext } from '@/shared/ui/Tiles/tileContext'
import { BaseModalWindow } from '@/shared/ui/modal'
import { FC, useContext } from 'react'

interface DeleteDashboardModalModalProps {
    onClose: () => void
}
export const DeleteDashboardModal: FC<DeleteDashboardModalModalProps> = ({
    onClose,
}) => {
    const { dashboardId } = useContext(TileContext)
    const { mutate, isPending } = useDeleteDashboardMutation()

    const deleteDashboard = (e: any) => {
        mutate(dashboardId)
    }

    return (
        <BaseModalWindow>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
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
            </div>
        </BaseModalWindow>
    )
}
