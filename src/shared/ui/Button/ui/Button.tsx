'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useFixSize } from '@/shared/hooks/useFixSize'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { clsx } from 'clsx'
import { memo } from 'react'

import { useClickWithHref } from '../model/hooks'
import { ButtonProps } from '../model/types'
import s from './s.module.scss'

/** Кнопка, которая так же может быть использована для мягкой навигации
 * @example <Button href="some href to navigate" /> */
export const Button = memo((props: ButtonProps) => {
    const {
        className,
        heightSize = 'content',
        active,
        variant = 'standart',
        activeVariant = 'active-fill',
        href,
        fixSize = true,
        style,
        loading,
        onClick,
        fullWidth,
        size = 'l',
        ref,
        ...other
    } = props

    const { nodeRef, fixWidthStyle } = useFixSize<HTMLButtonElement>()
    const combinedRef = useCombinedRef<HTMLButtonElement>(ref, nodeRef)
    const onClickWithHref = useClickWithHref(onClick, href)

    const createStyle = () => {
        if (fullWidth) {
            return { minWidth: '100%', ...style }
        } else if (fixSize) {
            return {
                ...style,
                ...fixWidthStyle,
            }
        } else {
            return style
        }
    }

    return (
        <button
            type='button'
            ref={combinedRef}
            style={createStyle()}
            onClick={onClickWithHref}
            className={clsx(
                s.btn,
                s[variant],
                s['size-' + size],
                s['h-' + heightSize],
                {
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
})

Button.displayName = 'Button'
