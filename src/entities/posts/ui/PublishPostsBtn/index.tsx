'use client'

import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { Button } from '@/shared/ui/Button'
import { FC, RefObject, useEffect } from 'react'

interface PublishPostsBtnProps {
    submitRef: RefObject<HTMLButtonElement>
}

export const PublishPostsBtn: FC<PublishPostsBtnProps> = (props) => {
    const { submitRef } = props

    const { isPending, status } = useCreatePostsMutation()

    useEffect(() => {
        console.log('from publish btn')
        console.log('status', status)
        console.log('isPending', isPending)
    }, [status, isPending])

    const onSubmit = () => {
        submitRef.current?.click()
    }

    return (
        <Button
            onClick={onSubmit}
            variant='red'
            loading={status === 'pending'}
        >
            Опубликовать
        </Button>
    )
}
