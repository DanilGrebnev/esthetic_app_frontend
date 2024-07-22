import { CreatePostForm } from '@/entities/posts'

import s from './s.module.sass'

export default function CreatePosts() {
    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <button className={s['submit-btn']}>Опубликовать</button>
            </header>
            <CreatePostForm />
        </div>
    )
}
