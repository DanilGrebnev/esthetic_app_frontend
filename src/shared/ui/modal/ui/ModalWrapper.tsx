'use client'

import { Layout } from '@/shared/types/layout'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { useModalContext } from '../model/ModalProvider/modalContext'
import s from './modal.module.scss'

export default function ModalWrapper({ children }: Layout) {
    const { isOpen, onClose } = useModalContext()

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                onClose?.()
            }}
            className={s.modal_bg_filter}
        >
            <AnimatePresence>
                <m.div
                    className={s.animate_wrapper}
                    initial={{}}
                    animate={isOpen ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.1 }}
                    exit={{ scale: 0.01 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </m.div>
            </AnimatePresence>
        </div>
    )
}
