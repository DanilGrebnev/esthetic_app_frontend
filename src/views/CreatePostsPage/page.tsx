'use client'

import { CreatePostForm } from '@/entities/posts'
import { useCheckAuthQuery } from '@/shared/api/auth'
import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import s from './s.module.scss'
import { CreatePostButton } from './ui/CreatePostButton'

export const CreatePosts = () => {
    const router = useRouter()
    const submitButtonRef = useRef<HTMLButtonElement | null>(null)

    const { data: authData } = useCheckAuthQuery()

    const { data: profileByCookie } = useGetProfileByCookieQuery()
    const { mutateAsync, isPending, isSuccess } = useCreatePostsMutation(
        profileByCookie?.userId || '',
    )
    // TODO: отображать сообщение для того, чтобы пользователь зарегистрировался или авторизовался
    if (!authData?.isAuth) {
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
                        mutateAsync(formData).then(() => {
                            router.push(
                                routes.userCreatedPosts.getRoute(
                                    profileByCookie?.userId,
                                ),
                            )
                        })
                    }}
                    submitBtnRef={submitButtonRef}
                />
            </Container>
        </div>
    )
}
