import DownloadIcon from '@/shared/assets/download-icon.svg'
import { downloadFileByURL } from '@/shared/utils/downloadFileByURL'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef, FC } from 'react'

import s from './s.module.scss'

const variants = {
    download: <DownloadIcon className={s['download-icon']} />,
}

interface CardCircleIconProps extends ComponentPropsWithoutRef<'button'> {
    className?: string
    variant?: keyof typeof variants
    href: string
    name: string
}

export const CircleButton: FC<CardCircleIconProps> = (props) => {
    const { variant = 'download', name, href, className, ...other } = props

    const onClick = () => {
        downloadFileByURL(href, name)
    }

    return (
        <button
            className={clsx(s.btn, className)}
            title='Скачать'
            onClick={(e) => {
                // e.stopPropagation()
                e.preventDefault()
                onClick()
            }}
            {...other}
        >
            {variants[variant]}
        </button>
    )
}
