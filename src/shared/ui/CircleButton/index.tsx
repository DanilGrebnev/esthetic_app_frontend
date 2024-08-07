import DownloadIcon from '@/shared/assets/download-icon.svg'
import clsx from 'clsx'
import { type ComponentPropsWithRef, type FC, forwardRef } from 'react'

import s from './s.module.scss'

const variants = {
    download: <DownloadIcon className={s['download-icon']} />,
}

interface CardCircleIconProps extends ComponentPropsWithRef<'button'> {
    icon?: keyof typeof variants
}

export const CircleButton = forwardRef<HTMLButtonElement, CardCircleIconProps>(
    (props, ref) => {
        const { icon = 'download', className, ...other } = props

        return (
            <button
                ref={ref}
                className={clsx(s.btn, className)}
                {...other}
            >
                {variants[icon]}
            </button>
        )
    },
)

CircleButton.displayName = 'CircleButton'
