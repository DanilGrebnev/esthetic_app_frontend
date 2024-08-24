import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { memo } from 'react'

export const PrevBtn = memo(() => {
    const { onPrev, currentPage } = useProgressWindow()
    const disabled = currentPage === 1

    return (
        <Button
            disabled={disabled}
            onClick={onPrev}
        >
            Назад
        </Button>
    )
})

PrevBtn.displayName = 'PrevBtn'
