import { clsx } from 'clsx'
import { type FC, ReactNode, useEffect, useRef, useState } from 'react'

import s from './Dialog.module.scss'

interface BaseDialog {
    variant: 'info' | 'success' | 'warning'
    children?: ReactNode
    open?: boolean
    className?: string
    closeTimeout?: number
}

export const Dialog: FC<BaseDialog> = (props) => {
    const { variant, className, open, children, closeTimeout } = props
    const [isOpen, setOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (open) setOpen(true)

        if (!open) {
            setOpen(false)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            return
        }

        if (closeTimeout) {
            timeoutRef.current = setTimeout(setOpen, closeTimeout, false)
        }
    }, [open, closeTimeout])

    return (
        <div
            className={clsx(
                s.dialog,
                s[variant],
                { [s.open]: isOpen },
                className,
            )}
        >
            <div className={s.wrapper}>{children}</div>
        </div>
    )
}

Dialog.displayName = 'Dialog'
