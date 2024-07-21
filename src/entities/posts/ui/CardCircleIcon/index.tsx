import DownloadIcon from '@/shared/assets/download-icon.svg'
import clsx from 'clsx'
import { type FC, HTMLAttributes, type ReactNode } from 'react'

import s from './s.module.sass'

const variants = {
    download: <DownloadIcon className='h-[20px] w-[20px] stroke-[2px]' />,
}

interface CardCircleIconProps extends HTMLAttributes<HTMLAnchorElement> {
    className?: string
    variant?: keyof typeof variants
    href: string
    name: string
}

export const CardCircleIcon: FC<CardCircleIconProps> = (props) => {
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
