'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { forwardRef, memo } from 'react'

import { ButtonProps } from '../model/types'
import s from './s.module.scss'

/**
 * Кнопка, которая так же может быть использована для мягкой навигации
 * @example <Button href="some href to navigate" />
 */
export const Button = memo(
    forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
        const {
            className,
            heightSize = 'content',
            active,
            variant = 'standart',
            activeVariant = 'active-fill',
            href,
            style,
            loading,
            onClick,
            fullWidth,
            size = 'l',
            ...other
        } = props
        const router = useRouter()

        const { nodeRef, fixWidthStyle } = useFixSize<HTMLButtonElement>()
        const combinedRef = useCombinedRef(ref, nodeRef)

        function createStyle() {
            return fullWidth
                ? { minWidth: '100%', ...style }
                : {
                      ...style,
                      ...fixWidthStyle,
                  }
        }

        return (
            <button
                type='button'
                ref={combinedRef}
                style={createStyle()}
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
                        [s['size-l']]: size === 'l',
                        [s['size-m']]: size === 'm',
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
    }),
)

Button.displayName = 'Button'
