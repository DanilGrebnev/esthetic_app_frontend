'use client'

import { type FC } from 'react'

import s from './modal.module.scss'

interface ModalProviderProps {
    children?: React.ReactNode
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
    return (
        <div
            id='modal-root'
            className={s['modal-provider']}
        ></div>
    )
}
