import { CreatePostForm, UploadPostsContentWindow } from '@/entities/posts'
import clsx from 'clsx'

import s from './s.module.sass'

export default function CreatePosts() {
    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <button className={s['submit-btn']}>Опубликовать</button>
            </header>
            <section className={clsx(s.section)}>
                <CreatePostForm />
            </section>
        </div>
    )
}
