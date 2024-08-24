'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { forwardRef } from 'react'

import s from './s.module.scss'
import { ButtonProps } from './types'

/**
 * Кнопка, которая так же может быть использована для мягкой навигации
 * @example <Button href="some href to navigate" />
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
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

        const { nodeRef, styleRef } = useFixSize<HTMLButtonElement>()
        const combinedRef = useCombinedRef(ref, nodeRef)

        return (
            <button
                type='button'
                ref={combinedRef}
                style={styleRef.current}
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
                <>
                    {!loading ? (
                        props.children
                    ) : (
                        <CircularProgress
                            className={s.progress}
                            sizesVariant='s'
                        />
                    )}
                </>
            </button>
        )
    },
)

Button.displayName = 'Button'
