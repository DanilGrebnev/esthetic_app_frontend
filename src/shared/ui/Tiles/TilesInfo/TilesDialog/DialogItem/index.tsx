import { type FC, memo } from 'react'

import s from './DialogItem.module.scss'

interface DialogItemProps {
    children?: string
    onClick?: () => void
}

export const _DialogItem: FC<DialogItemProps> = memo((props) => {
    const { children, onClick } = props

    return (
        <div
            onClick={onClick}
            title={children}
            className={s['dialog-item']}
        >
            {children}
        </div>
    )
})

_DialogItem.displayName = '_DialogItem'
