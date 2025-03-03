import { Button } from '@/shared/ui/Button'
import { memo, useEffect, useState } from 'react'

interface TimeoutComponentProps {
    enabled?: boolean
}

export const TimeoutComponent = memo((props: TimeoutComponentProps) => {
    const { enabled } = props
    const [ticState, setTicState] = useState(0)

    useEffect(() => {
        if (!enabled) return
        const id = setInterval(() => {
            setTicState((p) => (p += 1))
        }, 1000)

        return () => clearInterval(id)
    }, [enabled])

    return <p>{ticState}</p>
})

TimeoutComponent.displayName = 'TimeoutComponent'
