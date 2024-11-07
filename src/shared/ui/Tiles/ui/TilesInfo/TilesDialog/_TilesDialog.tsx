'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Children, FC, ReactNode, memo, useEffect, useRef } from 'react'

import s from './s.module.scss'

interface DialogProps {
    children?: ReactNode | ReactNode[]
    open?: boolean
    onClose?: () => void
}

export const _TilesDialogContainer: FC<DialogProps> = memo((props) => {
    const { children, open, onClose } = props
    const arrayChildren = Children.toArray(children)

    const ref = useRef<HTMLDivElement | null>(null)

    const close = (e: any) => {
        if (!ref.current?.contains(e.target)) {
            onClose?.()
        }
    }

    useEffect(() => {
        open && document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [open])

    const variantsRef = useRef({
        open: { scale: 1 },
        closed: { scale: 0 },
    })

    return (
        <AnimatePresence>
            {open && (
                <m.div
                    ref={ref}
                    initial={variantsRef.current.closed}
                    animate={open ? 'open' : 'closed'}
                    variants={variantsRef.current}
                    transition={{ duration: 0.1 }}
                    exit={variantsRef.current.closed}
                    className={s.dialog}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={s['dialog-wrapper']}>{arrayChildren}</div>
                </m.div>
            )}
        </AnimatePresence>
    )
})

_TilesDialogContainer.displayName = '_TilesDialogContainer'
