import DownloadIcon from '@/shared/assets/download-icon.svg'
import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'

import s from './s.module.scss'

const variants = {
    download: <DownloadIcon className={s['download-icon']} />,
}

interface CardCircleIconProps extends HTMLAttributes<HTMLAnchorElement> {
    className?: string
    variant?: keyof typeof variants
    href: string
    name: string
}

export const CircleButton: FC<CardCircleIconProps> = (props) => {
    const { variant = 'download', name, href, className, ...other } = props

    return (
        <a
            href={href}
            download={name}
            title='Скачать'
            className={clsx(s.btn, className)}
            {...other}
        >
            {variants[variant]}
        </a>
    )
}
