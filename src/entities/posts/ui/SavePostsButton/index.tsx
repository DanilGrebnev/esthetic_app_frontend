'use client'

import { Button } from '@/shared/ui/Button'
import { type ComponentPropsWithoutRef, type FC } from 'react'

interface ISavePostsButton extends ComponentPropsWithoutRef<'button'> {}

export const SavePostsButton: FC<ISavePostsButton> = ({
    className,
    ...other
}) => {
    return (
        <Button
            {...other}
            variant='red'
            className={className}
            onClick={(e) => {
                e.preventDefault()
            }}
        >
            Сохранить
        </Button>
    )
}
