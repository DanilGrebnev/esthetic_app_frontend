import { useDeletePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow } from '@/shared/ui/modal'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

import s from './DeleteModal.module.scss'

interface DeleteModalProps {
    onClose: () => void
    postsId: string
}

export const DeletePostsModal: FC<DeleteModalProps> = (props) => {
    const { onClose, postsId } = props
    const router = useRouter()

    const {
        mutateAsync: deletePost,
        isSuccess,
        isPending,
    } = useDeletePostsMutation()

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
