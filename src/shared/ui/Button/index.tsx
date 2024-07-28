'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type ButtonHTMLAttributes, type FC } from 'react'

import s from './s.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    active?: boolean
    heightSize?: 'full' | 'content'
    href?: string
    variant?: 'standart' | 'red' | 'silver'
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
        variant = 'standart',
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
                s.btn,
                s[variant],
                {
                    [s['h-full']]: heightSize === 'full',
                    [s['h-content']]: heightSize === 'content',
                    [s.active]: active,
                },
                className,
            )}
            {...other}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button'
