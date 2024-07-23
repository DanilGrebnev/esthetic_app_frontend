'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type FC, type MouseEvent, type ReactNode } from 'react'

import s from './s.module.scss'

interface CircleIconProps {
    children?: ReactNode
    className?: string
    href?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const CircleIcon: FC<CircleIconProps> = (props) => {
    const { children, href, onClick, className } = props
    const router = useRouter()

    return (
        <button
            type='button'
            onClick={(e) => {
                href ? router.push(href) : onClick?.(e)
            }}
            className={clsx(s['icon-wrapper'], className)}
        >
            <div className={s.icon}>{children}</div>
        </button>
    )
}
