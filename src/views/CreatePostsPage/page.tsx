'use client'

import { CreatePostForm, PublishPostsBtn } from '@/entities/posts'
import { useRef, useState } from 'react'

import s from './s.module.scss'

export const CreatePosts = () => {
    const ref = useRef<HTMLButtonElement>(null)

    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <PublishPostsBtn submitRef={ref} />
            </header>
            <CreatePostForm ref={ref} />
        </div>
    )
}
