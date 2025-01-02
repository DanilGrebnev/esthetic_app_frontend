import clsx from 'clsx'

import s from './delete-comment-dialog.module.scss'

interface DeleteCommentDialogProps {
    open: boolean
    setOpenModal: () => void
}
export const DeleteCommentDialog = (props: DeleteCommentDialogProps) => {
    const { open, setOpenModal } = props

    return (
        <div
            className={clsx(s['delete-block'], {
                [s.open]: open,
            })}
        >
            <p>Удалить комментарий?</p>
            <div className={s['delete-block-control']}>
                <button className='border-line'>Удалить</button>
                <button onClick={setOpenModal}>Отмена</button>
            </div>
        </div>
    )
}
