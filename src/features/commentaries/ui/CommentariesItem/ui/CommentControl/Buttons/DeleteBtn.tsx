'use client'

import { Modal } from '@/shared/ui/modal'
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
                onClick={() => {
                    setOpenModal(true)
                }}
                className={clsx(s.btn, className)}
            >
                Удалить
            </button>
            <Modal isOpen={openModal}></Modal>
        </>
    )
}
