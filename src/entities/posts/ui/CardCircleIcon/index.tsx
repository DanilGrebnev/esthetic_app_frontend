import DownloadIcon from '@/shared/assets/download-icon.svg'
import clsx from 'clsx'
import { type FC, HTMLAttributes, type ReactNode } from 'react'

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
            className={clsx(
                'flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[white] outline-none transition-[.3] active:scale-[.9]',
                className,
            )}
            {...other}
        >
            {variants[variant]}
        </a>
    )
}
