'use client'

import type { FC, ReactNode } from 'react'

import s from './modal.module.scss'

interface ModalProviderProps {
    children?: ReactNode
}

export const _ModalRoot: FC<ModalProviderProps> = () => {
    return (
        <div
            id='modal-root'
            className={s['modal-root']}
        ></div>
    )
}
