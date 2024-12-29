'use client'

import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { ReactNode, useRef } from 'react'

import { useModalContext } from './ModalProvider/modalContext'
import s from './modal.module.scss'

export default function ModalWrapper({ children }: { children: ReactNode }) {
    const { isOpen, onClose } = useModalContext()

    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                onClose?.()
            }}
            className={s['modal-bg-filter']}
        >
            <AnimatePresence>
                <m.div
                    initial={{ scale: 0 }}
                    animate={isOpen ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.1 }}
                    exit={{ scale: 0 }}
                    className={s['animate-wrapper']}
                >
                    {children}
                </m.div>
            </AnimatePresence>
        </div>
    )
}
