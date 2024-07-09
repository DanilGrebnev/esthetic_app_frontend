'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type FC, type MouseEvent, type ReactNode } from 'react'

import s from './s.module.sass'

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
            className={clsx(
                `flex h-[48px] w-[48px] items-center justify-center rounded-full outline-none duration-[.3s]`,
                s.icon,
                className,
            )}
        >
            <div className='flex h-[24px] w-[24px] items-center justify-center overflow-hidden'>
                {children}
            </div>
        </button>
    )
}
