'use client'

import { Client } from '@/app/(pages)/test-page/Client'

import s from './s.module.scss'

const tabs = ['Tab1', 'Tab2', 'Tab3']

export default function TestPage() {
    return (
        <div className={s.wrapper}>
            <Client />
        </div>
    )
}
