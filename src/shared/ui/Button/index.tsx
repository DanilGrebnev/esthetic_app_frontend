'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type ComponentPropsWithoutRef, type FC } from 'react'

import s from './s.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    className?: string
    active?: boolean
    activeVariant?: 'active-fill' | 'active-underline'
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
        activeVariant = 'active-fill',
        href,
        onClick,
        ...other
    } = props
    const router = useRouter()

    return (
        <button
            type='button'
            onClick={(e) => {
                onClick?.(e)
                if (href) router.push(href)
            }}
            className={clsx(
                s.btn,
                s[variant],
                {
                    [s['h-full']]: heightSize === 'full',
                    [s['h-content']]: heightSize === 'content',
                    [s[activeVariant]]: active,
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
