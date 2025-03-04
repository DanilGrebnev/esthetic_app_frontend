import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { memo } from 'react'

import { ButtonTypes } from './types'

export const NextBtn = memo(({ disabled, onClick }: ButtonTypes) => {
    const { onNext, isLastPage } = useProgressWindow()

    /** Отключаем кнопку, если страница последняя,
     * либо проп disabled = true */
    const disabledBtn = isLastPage || disabled

    return (
        <Button
            disabled={disabledBtn}
            onClick={() => {
                onNext()
                onClick?.()
            }}
        >
            Далее
        </Button>
    )
})

NextBtn.displayName = 'NextBtn'
