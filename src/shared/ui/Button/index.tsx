'use client'

import { useFixSize } from '@/shared/hooks/useFixSize'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FC, forwardRef } from 'react'

import s from './s.module.scss'
import { ButtonProps } from './types'

/**
 * Кнопка, которая так же может быть использована для мягкой навигации
 * @example <Button href="some href to navigate" />
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            children,
            className,
            heightSize = 'content',
            active,
            variant = 'standart',
            activeVariant = 'active-fill',
            href,
            loading,
            onClick,
            ...other
        } = props
        const router = useRouter()

        return (
            <button
                type='button'
                ref={ref}
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
                        [s.loading]: loading,
                    },
                    className,
                )}
                {...other}
            >
                {!loading ? children : <CircularProgress sizesVariant='s' />}
            </button>
        )
    },
)

Button.displayName = 'Button'
