'use client'

import { useCheckPostInDashboard } from '@/shared/api/dashboards'
import { useDeletePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { useGetPostIdSelector } from '@/shared/store/posts'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow } from '@/shared/ui/modal'
import { useRouter } from 'next/navigation'

import s from './DeleteModal.module.scss'

interface DeleteModalProps {
    onClose: () => void
}

export const DeletePostsModal = (props: DeleteModalProps) => {
    const { onClose } = props
    const router = useRouter()

    const postsId = useGetPostIdSelector()

    const { data: profileByCookie } = useGetProfileByCookieQuery()

    const { data: postsInDashboardResponse } = useCheckPostInDashboard({
        postsId,
    })

    const {
        mutateAsync: deletePost,
        isSuccess,
        isPending,
    } = useDeletePostsMutation({
        usersId: profileByCookie?.userId || '',
        dashboardsId: postsInDashboardResponse?.inDashboards ?? [],
    })

    return (
        <BaseModalWindow className={s.modal}>
            <h3>Удалить пост?</h3>
            <div className={s['btn-group']}>
                <Button
                    disabled={isSuccess}
                    loading={isPending}
                    onClick={() =>
                        deletePost(postsId).then(() => {
                            onClose()
                            router.back()
                        })
                    }
                >
                    Удалить
                </Button>
                <Button onClick={onClose}>Отмена</Button>
            </div>
        </BaseModalWindow>
    )
}
