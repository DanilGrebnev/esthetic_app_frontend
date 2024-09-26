'use client'

import {
    MenuPostBtnContext,
    useMenuPostBtnContext,
} from '@/entities/posts/ui/MenuPostBtn/ui/MenuPostBtnContext'
import { useCheckPostInDashboard } from '@/shared/api/dashboards'
import { useDeletePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow } from '@/shared/ui/modal'
import { useRouter } from 'next/navigation'
import { type FC, useContext, useEffect } from 'react'

import s from './DeleteModal.module.scss'

interface DeleteModalProps {
    onClose: () => void
}

export const DeletePostsModal: FC<DeleteModalProps> = (props) => {
    const { onClose } = props
    const router = useRouter()

    const { postsId } = useMenuPostBtnContext()

    const { data: privateProfile } = useGetPrivateProfileQuery()

    const { data: postsInDashboardResponse } = useCheckPostInDashboard({
        postsId,
    })

    useEffect(() => {
        console.log('postsInDashboardResponse', postsInDashboardResponse)
    }, [postsInDashboardResponse])

    const {
        mutateAsync: deletePost,
        isSuccess,
        isPending,
    } = useDeletePostsMutation({
        usersId: privateProfile?.userId || '',
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
