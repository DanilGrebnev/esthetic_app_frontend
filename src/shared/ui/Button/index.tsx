'use client'

import clsx from 'clsx'
import { nanoid } from 'nanoid'
import Link from 'next/link'
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
                'flex items-center justify-center rounded-[--global-border-radius] px-[15px]',
                {
                    'min-h-full': heightSize === 'full',
                    'h-max': heightSize === 'content',
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

// function test(props) {}
