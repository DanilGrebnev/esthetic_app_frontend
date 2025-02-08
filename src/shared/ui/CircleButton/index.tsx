import ArrowIcon from '@/shared/assets/arrow.svg'
import DeleteIcon from '@/shared/assets/delete-icon.svg'
import DotICon from '@/shared/assets/dot-menu.svg'
import DownloadIcon from '@/shared/assets/download-icon.svg'
import EditIcon from '@/shared/assets/edit-icon.svg'
import clsx from 'clsx'
import { type ComponentPropsWithRef, type Ref, forwardRef, memo } from 'react'

import s from './s.module.scss'

const variants = {
    download: <DownloadIcon className={s.download} />,
    dot: <DotICon className={s.dot} />,
    delete: <DeleteIcon className={s.delete} />,
    edit: <EditIcon className={s.edit} />,
    arrow: <ArrowIcon className={s.arrow} />,
}

interface CircleButton extends ComponentPropsWithRef<'button'> {
    icon?: keyof typeof variants
    variant?: 'box-shadow' | 'stroke'
    ref?: Ref<HTMLButtonElement>
}

export const CircleButton = memo((props: CircleButton) => {
    const {
        icon = 'download',
        className,
        ref,
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
})

CircleButton.displayName = 'CircleButton'
