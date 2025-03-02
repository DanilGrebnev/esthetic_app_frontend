import { Button } from '@/shared/ui/Button'
import { useEffect, useState } from 'react'

export const TimeoutComponent = () => {
    const [ticState, setTicState] = useState(0)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        if (!enabled) return
        const i = setInterval(() => {
            setTicState((p) => (p += 1))
        }, 1000)

        return () => clearInterval(i)
    }, [enabled])

    return (
        <div>
            <p>{ticState}</p>
            <div className='flex gap-[20px]'>
                <Button
                    variant='silver'
                    onClick={() => {
                        setEnabled(true)
                    }}
                    disabled={enabled}
                >
                    {ticState === 0 ? 'start' : 'continue'}
                </Button>
                <Button
                    variant='silver'
                    disabled={!enabled}
                    onClick={() => {
                        setEnabled(false)
                    }}
                >
                    stop
                </Button>
                <Button
                    onClick={() => {
                        setEnabled(false)
                        setTicState(0)
                    }}
                >
                    Reset
                </Button>
                <Button
                    onClick={() => {
                        setTicState(10)
                    }}
                >
                    Set start time 10
                </Button>
            </div>
        </div>
    )
}
