import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { memo } from 'react'

export const NextBtn = memo(() => {
    const { onNext, isLastPage } = useProgressWindow()

    return (
        <Button
            disabled={isLastPage}
            onClick={() => onNext()}
        >
            Далее
        </Button>
    )
})

NextBtn.displayName = 'NextBtn'
