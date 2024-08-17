'use client'

import { Button } from '@/shared/ui/Button'

import { useGetPostsDataSelector } from '../../model/slice'

export const PublishPostsBtn = () => {
    const data = useGetPostsDataSelector()

    const onSubmit = () => {
        console.log(data)
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
