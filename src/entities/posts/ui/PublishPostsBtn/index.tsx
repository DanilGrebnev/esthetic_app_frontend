'use client'

import { useGetPostsSubmitBtnSelector } from '@/entities/posts/model/slice'
import { Button } from '@/shared/ui/Button'

export const PublishPostsBtn = () => {
    const submitButtonRef = useGetPostsSubmitBtnSelector()

    const onSubmit = () => {
        submitButtonRef?.current?.click()
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
