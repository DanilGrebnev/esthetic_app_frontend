'use client'

import { Button } from '@/shared/ui/Button'
import { FC, RefObject } from 'react'

interface PublishPostsBtnProps {
    submitRef: RefObject<HTMLButtonElement>
}

export const PublishPostsBtn: FC<PublishPostsBtnProps> = (props) => {
    const { submitRef } = props

    const onSubmit = () => {
        // submitButtonRef?.current?.click()
        submitRef.current?.click()
    }

    return (
        <Button
            onClick={onSubmit}
            variant='red'
        >
            Опубликовать
        </Button>
    )
}
