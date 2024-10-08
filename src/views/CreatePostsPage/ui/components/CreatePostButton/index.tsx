import { Button } from '@/shared/ui/Button'
import { FC, RefObject, useEffect } from 'react'

interface PublishPostsBtnProps {
    submitButtonRef: RefObject<HTMLButtonElement>
    loading?: boolean
    isSuccess: boolean
}

export const CreatePostButton: FC<PublishPostsBtnProps> = (props) => {
    const { submitButtonRef, loading, isSuccess } = props

    const onSubmit = () => {
        submitButtonRef.current?.click()
    }

    return (
        <Button
            loading={loading}
            onClick={onSubmit}
            variant='red'
            disabled={isSuccess}
        >
            Опубликовать
        </Button>
    )
}
