'use client'

import { Input } from '@/shared/ui/Input'

export default function CreatePosts() {
    return (
        <div className='flex grow flex-col'>
            <header className='border-b-[1px] border-b-[black] p-[20px]'>
                Создание пина
            </header>
            <section className='grow border-[1px]'>
                <Input />
            </section>
        </div>
    )
}
