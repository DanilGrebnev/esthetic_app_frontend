'use client'

import TextField from '@mui/material/TextField'
import clsx from 'clsx'

import s from './s.module.sass'

export default function CreatePosts() {
    return (
        <div className={s.page}>
            <header className={s.header}>Создание пина</header>
            <section className={clsx(s.section)}>
                <div className={s['left-col']}>
                    <div className={s.upload}></div>
                </div>
                <div className={s['right-col']}>
                    <TextField
                        id='outlined-basic'
                        label='Добавить название'
                        variant='outlined'
                    />
                    <TextField
                        id='outlined-basic'
                        label='Добавить описание'
                        multiline
                        maxRows={5}
                        variant='outlined'
                    />
                </div>
            </section>
        </div>
    )
}
