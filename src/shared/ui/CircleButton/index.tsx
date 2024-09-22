import DeleteIcon from '@/shared/assets/delete-icon.svg'
import DotICon from '@/shared/assets/dot-menu.svg'
import DownloadIcon from '@/shared/assets/download-icon.svg'
import EditIcon from '@/shared/assets/edit-icon.svg'
import clsx from 'clsx'
import { type ComponentPropsWithRef, forwardRef } from 'react'

import s from './s.module.scss'

const variants = {
    download: <DownloadIcon className={s.download} />,
    dot: <DotICon className={s.dot} />,
    delete: <DeleteIcon className={s.delete} />,
    edit: <EditIcon className={s.edit} />,
}

interface CircleButton extends ComponentPropsWithRef<'button'> {
    icon?: keyof typeof variants
    variant?: 'box-shadow' | 'stroke'
}

export const CircleButton = forwardRef<HTMLButtonElement, CircleButton>(
    (props, ref) => {
        const {
            icon = 'download',
            className,
            variant = 'box-shadow',
            ...other
        } = props

        return (
            <button
                ref={ref}
                className={clsx(s.btn, s[variant], className)}
                {...other}
            >
                {variants[icon]}
            </button>
        )
    },
)

CircleButton.displayName = 'CircleButton'
