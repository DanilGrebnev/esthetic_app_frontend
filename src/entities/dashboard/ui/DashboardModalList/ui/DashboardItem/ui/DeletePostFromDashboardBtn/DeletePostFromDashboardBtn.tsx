import { useDeletePostsFromDashboardMutation } from '@/shared/api/dashboards'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

interface DeletePostFromDashboardBtnProps {
    usersId: string
    dashboardId: string
    postsId: string
}

export const DeletePostFromDashboardBtn: FC<DeletePostFromDashboardBtnProps> = (
    props,
) => {
    const { usersId, dashboardId, postsId } = props

    const {
        mutate: deletePostFromDashboard,
        isPending: pendingDeletePostFromDashboard,
    } = useDeletePostsFromDashboardMutation({
        usersId,
    })

    return (
        <Button
            size='m'
            variant='red'
            loading={pendingDeletePostFromDashboard}
            onClick={() => {
                deletePostFromDashboard({ dashboardId, postsId })
            }}
        >
            Удалить
        </Button>
    )
}

DeletePostFromDashboardBtn.displayName = 'DeletePostFromDashboardBtn'
