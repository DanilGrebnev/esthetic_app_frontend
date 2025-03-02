'use client'

import { Button } from '@/shared/ui/Button'
import { CellInput } from '@/shared/ui/CellInput'
import { TimeoutComponent } from '@/shared/ui/TimeoutComponent'
import { useState } from 'react'

export const TestPage = () => {
    const [s, setS] = useState(false)

    return (
        <div className='p-[20px]'>
            <h1>Test page</h1>
            <TimeoutComponent />
            <CellInput
                length={5}
                getResult={(result) => {
                    console.log(result)
                }}
            />
            <Button
                variant='silver'
                onClick={() => {
                    setS((p) => (p = !p))
                }}
            >
                Кнопка
            </Button>
        </div>
    )
}
