import { useDeleteDashboardMutation } from '@/shared/api/dashboards'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow } from '@/shared/ui/modal'
import { FC, useContext, useEffect } from 'react'

import { TileContext } from '../../../model/tileContext'

interface DeleteDashboardModalModalProps {
    onClose: () => void
}
export const DeleteDashboardModal: FC<DeleteDashboardModalModalProps> = ({
    onClose,
}) => {
    const { dashboardId } = useContext(TileContext)

    const { data: profileData } = useGetPrivateProfileQuery()

    const { mutate, isPending } = useDeleteDashboardMutation(
        profileData?.userId || '',
    )

    useEffect(() => {
        console.log('modal is mounted')
        return () => console.log('modal is unmounted')
    }, [])

    const deleteDashboard = () => {
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
