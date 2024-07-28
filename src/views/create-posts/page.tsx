import { CreatePostForm } from '@/entities/posts'
import { Button } from '@/shared/ui/Button'

import s from './s.module.scss'

export const CreatePosts = () => {
    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <Button
                    className={s['submit-btn']}
                    variant='red'
                >
                    Опубликовать
                </Button>
            </header>
            <CreatePostForm />
        </div>
    )
}
