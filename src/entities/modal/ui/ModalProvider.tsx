'use client'

import { useIsOpenModal } from '@/entities/modal'
import { FC } from 'react'

import s from './modal.module.scss'

interface ModalProviderProps {
    children?: React.ReactNode
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
    const isOpen = useIsOpenModal()

    return (
        <div
            id='modal-root'
            className={s['modal-provider']}
        ></div>
    )
}
