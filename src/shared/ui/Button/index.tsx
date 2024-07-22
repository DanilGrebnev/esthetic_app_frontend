'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type ButtonHTMLAttributes, type FC } from 'react'

import s from './s.module.sass'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    active?: boolean
    heightSize?: 'full' | 'content'
    href?: string
}

/**
 * Кнопка, которая так же может быть использована для мягкой навигации
 * @example <Button href="some href to navigate" />
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        heightSize = 'content',
        active,
        href,
        onClick,
        ...other
    } = props
    const router = useRouter()

    return (
        <button
            type='button'
            onClick={(e) => {
                if (href) router.push(href)
                onClick?.(e)
            }}
            className={clsx(
                {
                    [s['h-full']]: heightSize === 'full',
                    [s['h-content']]: heightSize === 'content',
                    [s.active]: active,
                },
                s.btn,
                className,
            )}
            {...other}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button'
