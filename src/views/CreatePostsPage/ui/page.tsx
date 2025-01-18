'use client'

import { CreatePostForm } from '@/entities/posts'
import { useCheckAuthQuery } from '@/shared/api/auth'
import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import toast from 'react-hot-toast'

import { CreatePostButton } from './components/CreatePostButton'
import s from './s.module.scss'

export const CreatePostsPage = () => {
    const router = useRouter()
    const submitButtonRef = useRef<HTMLButtonElement | null>(null)

    const { data: authData, isPending: isPendingAuth } = useCheckAuthQuery()

    const { data: profileByCookie } = useGetProfileByCookieQuery()

    const { mutate, isPending, isSuccess } = useCreatePostsMutation(
        profileByCookie?.userId || '',
    )

    // TODO: отображать сообщение для того, чтобы пользователь зарегистрировался или авторизовался
    if (!authData?.isAuth && !isPendingAuth) {
        return router.push(routes.login.getRoute())
    }

    return (
        <div className={s.page}>
            <header className={s.header}>
                <p>Создание пина</p>
                <CreatePostButton
                    isSuccess={isSuccess}
                    loading={isPending}
                    submitButtonRef={submitButtonRef}
                />
            </header>
            <Container size='m'>
                <CreatePostForm
                    postsEdit={false}
                    isPending={isPending}
                    mutate={(formData) => {
                        mutate(formData, {
                            onSuccess: () => {
                                toast.success('Опубликовано')
                                router.push(
                                    routes.userCreatedPosts.getRoute(
                                        profileByCookie?.userId,
                                    ),
                                )
                            },
                            onError: () => {
                                toast.error('Ошибка публикации')
                            },
                        })
                    }}
                    submitBtnRef={submitButtonRef}
                />
            </Container>
        </div>
    )
}
