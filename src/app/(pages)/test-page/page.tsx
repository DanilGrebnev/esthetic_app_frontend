'use client'

import {
    ProgressWindowContainer,
    ProgressWindowProvider,
    ProgressWindowTab,
} from '@/shared/ui/ProgressWindow'

import { NextBtn, PrevBtn } from './Buttons'
import s from './s.module.scss'

const tabs = ['Tab1', 'Tab2', 'Tab3']

export default function TestPage() {
    return (
        <div className={s.wrapper}>
            <ProgressWindowProvider>
                <ProgressWindowContainer>
                    {tabs.map((tab, i) => (
                        <ProgressWindowTab key={i}>
                            <div className={s.tab}>{tab}</div>
                        </ProgressWindowTab>
                    ))}
                </ProgressWindowContainer>

                <PrevBtn />
                <NextBtn />
            </ProgressWindowProvider>
        </div>
    )
}
