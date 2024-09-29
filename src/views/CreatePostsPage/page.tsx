'use client'

import { CreatePostForm } from '@/entities/posts'
import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import s from './s.module.scss'
import { CreatePostButton } from './ui/CreatePostButton'

export const CreatePosts = () => {
    const router = useRouter()
    const submitButtonRef = useRef<HTMLButtonElement | null>(null)

    const { data: privateProfile } = useGetPrivateProfileQuery()
    const { mutateAsync, isPending, isSuccess } = useCreatePostsMutation(
        privateProfile?.userId || '',
    )

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
                                    privateProfile?.userId,
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
