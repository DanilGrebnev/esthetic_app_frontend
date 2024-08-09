'use client'

import { Button } from '@/shared/ui/Button'
import { type ComponentPropsWithoutRef, type FC, memo, useState } from 'react'

import s from './s.module.scss'

interface ISavePostsButton extends ComponentPropsWithoutRef<'button'> {}

export const SavePostsButton: FC<ISavePostsButton> = memo(
    ({ className, onClick, ...other }) => {
        return (
            <Button
                {...other}
                variant='red'
                className={className}
                onClick={(e) => {
                    e.preventDefault()
                    onClick?.(e)
                }}
            >
                Сохранить
            </Button>
        )
    },
)

SavePostsButton.displayName = 'SavePostsButton'
