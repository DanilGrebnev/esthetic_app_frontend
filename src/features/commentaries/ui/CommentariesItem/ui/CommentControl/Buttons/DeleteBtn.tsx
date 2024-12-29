import { clsx } from 'clsx'

import s from './buttons.module.scss'

interface DeleteBtnProps {
    className?: string
}
export const DeleteBtn = (props: DeleteBtnProps) => {
    const { className } = props

    return <button className={clsx(s.btn, className)}>Удалить</button>
}
