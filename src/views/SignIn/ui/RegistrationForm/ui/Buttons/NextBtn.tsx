import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { memo } from 'react'

import { ButtonTypes } from './types'

export const NextBtn = memo(({ disabled }: ButtonTypes) => {
    const { onNext, isLastPage } = useProgressWindow()

    return (
        <Button
            disabled={isLastPage || disabled}
            onClick={() => onNext()}
        >
            Далее
        </Button>
    )
})

NextBtn.displayName = 'NextBtn'
