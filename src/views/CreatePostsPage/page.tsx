'use client'

import { CreatePostForm } from '@/entities/posts'
import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import s from './s.module.scss'
import { CreatePostButton } from './ui/CreatePostButton'

export const CreatePosts = () => {
    const router = useRouter()
    const submitButtonRef = useRef<HTMLButtonElement>(null)

    const { data: privateProfile } = useGetPrivateProfileQuery()
    const { mutate, isPending, isSuccess } = useCreatePostsMutation(
        privateProfile?.userId || '',
    )

    useEffect(() => {
        if (isSuccess) {
            router.push(
                routes.userCreatedPosts.getRoute(privateProfile?.userId),
            )
        }
    }, [isSuccess, router, privateProfile])

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
            <CreatePostForm
                isPending={isPending}
                mutate={mutate}
                ref={submitButtonRef}
            />
        </div>
    )
}
