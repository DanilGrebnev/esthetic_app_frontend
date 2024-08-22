'use client'

import { Button } from '@/shared/ui/Button'
import type { FC, RefObject } from 'react'

interface PublishPostsBtnProps {
    submitRef: RefObject<HTMLButtonElement>
    loading?: boolean
}

export const PublishPostsBtn: FC<PublishPostsBtnProps> = (props) => {
    const { submitRef, loading } = props
    const onSubmit = () => {
        submitRef.current?.click()
    }

    return (
        <Button
            onClick={onSubmit}
            variant='red'
            loading={loading}
        >
            Опубликовать
        </Button>
    )
}
