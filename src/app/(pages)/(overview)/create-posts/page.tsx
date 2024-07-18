'use client'

import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import clsx from 'clsx'

import s from './s.module.sass'

const selectOptions = [
    { name: 'one', value: 'one' },
    { name: 'two', value: 'two' },
]

export default function CreatePosts() {
    return (
        <div className={s.page}>
            <header
                className={clsx(s.header, 'flex items-center justify-between')}
            >
                <p className='font-bold'>Создание пина</p>
                <button className='rounded-full bg-[red] p-[10px] font-[500] text-[white] transition-[.3s] hover:scale-[0.9]'>
                    Опубликовать
                </button>
            </header>
            <section className={clsx(s.section)}>
                <div className={s['left-col']}>
                    <div className={s.upload}></div>
                </div>
                <div className={s['right-col']}>
                    <Input
                        id='outlined-basic'
                        label='Название'
                        placeholder='Добавить название'
                        variant='outlined'
                    />
                    <Input
                        id='outlined-basic'
                        label='Добавить описание'
                        placeholder='Добавьте подробное описание'
                        multiline
                        minRows={5}
                        maxRows={10}
                        variant='outlined'
                    />
                    <Input
                        id='outlined-basic'
                        label='Ссылка'
                        placeholder='Добавить ссылку'
                        variant='outlined'
                    />

                    <Select
                        onChange={(value) => {
                            console.log(value)
                        }}
                        label='Доска'
                    >
                        {selectOptions}
                    </Select>
                </div>
            </section>
        </div>
    )
}
