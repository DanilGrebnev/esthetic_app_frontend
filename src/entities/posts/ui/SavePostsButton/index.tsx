'use client'

import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

interface ISavePostsButton {
    className?: string
}

export const SavePostsButton: FC<ISavePostsButton> = ({ className }) => {
    return (
        <Button
            variant='red'
            className={className}
        >
            Сохранить
        </Button>
    )
}
