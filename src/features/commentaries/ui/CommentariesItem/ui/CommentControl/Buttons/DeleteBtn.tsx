'use client'

import { clsx } from 'clsx'
import { MouseEventHandler, useState } from 'react'

import s from './buttons.module.scss'

interface DeleteBtnProps {
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}
export const DeleteBtn = (props: DeleteBtnProps) => {
    const { className, onClick } = props
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <button
                onClick={onClick}
                className={clsx(s.btn, 'bottom-line', className)}
            >
                Удалить
            </button>
        </>
    )
}
