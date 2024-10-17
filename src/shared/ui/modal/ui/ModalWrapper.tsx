import { m } from 'framer-motion'
import { ReactNode, useRef } from 'react'

import s from './modal.module.scss'

export default function ModalWrapper({
    children,
    onClose,
}: {
    children: ReactNode
    onClose?: () => void
}) {
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
            <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
                className={s['animate-wrapper']}
            >
                {children}
            </m.div>
        </div>
    )
}
