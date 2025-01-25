'use client'

import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { ProgressWindow, useProgressWindow } from '@/shared/ui/ProgressWindow'

function Btn({ text, next, prev }: any) {
    const { onNext, onPrev } = useProgressWindow()
    return <button onClick={next ? onNext : onPrev}>{text}</button>
}

export default function TestPage() {
    return (
        <Container size='m'>
            <ProgressWindow.Provider>
                <ProgressWindow.Container>
                    <ProgressWindow.Tab>
                        <input placeholder='input 1' />
                        <input placeholder='input 2' />
                    </ProgressWindow.Tab>
                    <ProgressWindow.Tab>
                        <input placeholder='input 3' />
                        <input placeholder='input 4' />
                    </ProgressWindow.Tab>
                    <ProgressWindow.Tab>
                        <input placeholder='input 5' />
                        <input placeholder='input 6' />
                    </ProgressWindow.Tab>
                </ProgressWindow.Container>
                <div className='flex gap-[10px]'>
                    <Btn
                        text='next'
                        next
                    />
                    <Btn
                        text='prev'
                        prev
                    />
                </div>
            </ProgressWindow.Provider>
        </Container>
    )
}
