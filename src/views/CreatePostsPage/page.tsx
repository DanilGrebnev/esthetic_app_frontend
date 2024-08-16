import { CreatePostForm, PublishPostsBtn } from '@/entities/posts'
import { type FC } from 'react'

import s from './s.module.scss'

export const CreatePosts: FC = () => {
    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <PublishPostsBtn />
            </header>
            <CreatePostForm />
        </div>
    )
}
