import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { type FC, memo } from 'react'

import { type ButtonTypes } from './types'

export const PrevBtn: FC<ButtonTypes> = memo(({ disabled }) => {
    const { onPrev, currentPage } = useProgressWindow()

    return (
        <Button
            disabled={currentPage === 1 || disabled}
            onClick={onPrev}
        >
            Назад
        </Button>
    )
})

PrevBtn.displayName = 'PrevBtn'
