import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'

import s from './modal.module.scss'

interface BaseModalWindowProps {
    children?: ReactNode
    className?: string
}

export const BaseModalWindow: FC<BaseModalWindowProps> = ({
    className,
    children,
}) => {
    return <div className={clsx(s.modal, className)}>{children}</div>
}
