import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { memo } from 'react'

export const NextBtn = () => {
    const { onNext } = useProgressWindow()
    console.log('NextBtn')
    return <button onClick={onNext}>Next</button>
}

export const PrevBtn = memo(() => {
    const { onPrev } = useProgressWindow()
    console.log('PrevBtn')
    return <button onClick={onPrev}>Prev</button>
})

PrevBtn.displayName = 'PrevBtn'
