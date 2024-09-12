import { clsx } from 'clsx'
import { type FC, ReactNode } from 'react'

import s from './Dialog.module.scss'

interface DialogProps {
    variant: 'info' | 'success' | 'warning'
    children?: ReactNode
    open?: boolean
    onClose?: () => void
    className?: string
}

export const Dialog: FC<DialogProps> = (props) => {
    const { variant, onClose, className, open, children } = props

    return (
        <div
            className={clsx(
                s.dialog,
                s[variant],
                { [s.open]: open },
                className,
            )}
        >
            <div className={s.wrapper}>{children}</div>
        </div>
    )
}

Dialog.displayName = 'Dialog'
