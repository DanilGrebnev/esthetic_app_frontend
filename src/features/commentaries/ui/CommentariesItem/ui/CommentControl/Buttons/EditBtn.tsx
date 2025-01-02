import { clsx } from 'clsx'
import { MouseEventHandler } from 'react'

import s from './buttons.module.scss'

interface EditBtnProps {
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}
export const EditBtn = (props: EditBtnProps) => {
    const { className, onClick } = props

    return (
        <button
            onClick={onClick}
            className={clsx(s.btn, className)}
        >
            Изменить
        </button>
    )
}
