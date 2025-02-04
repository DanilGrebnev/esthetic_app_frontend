'use client'

import { CreatePostForm } from '@/entities/posts'
import {
    useGetDetailPostsQuery,
    useUpdatePostsMutation,
} from '@/shared/api/posts'
import { useGetPostIdSelector } from '@/shared/store/posts'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { BaseModalWindow, useModalContext } from '@/shared/ui/modal'
import { useRef } from 'react'
import toast from 'react-hot-toast'

import s from './EditPostsModal.module.scss'

export const EditPostsModal = () => {
    const postsId = useGetPostIdSelector()
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const { onClose } = useModalContext()

    const { data: postData } = useGetDetailPostsQuery(postsId)

    const { mutate, isError, error, isPending } = useUpdatePostsMutation({
        postsId,
    })

    const onSuccess = () => {
        onClose?.()
        toast.success('Запись изменена успешно')
    }

    const onError = () => {
        if (!isError) return
        toast.error(error.message)
    }

    return (
        <Container size='s'>
            <BaseModalWindow className={s.modal}>
                <h3>Изменение поста</h3>
                <CreatePostForm
                    postsEdit={true}
                    isPending={isPending}
                    defaultValues={{
                        name: postData?.post?.name ?? '',
                        link: postData?.post?.link ?? '',
                        description: postData?.post?.description ?? '',
                        tags: postData?.post?.tags ?? [],
                    }}
                    mutate={({ formData }) => {
                        mutate(
                            { body: formData, postsId },
                            {
                                onSuccess,
                                onError,
                            },
                        )
                    }}
                    submitBtnRef={submitRef}
                />

                <div className={s['btn-group']}>
                    <Button
                        loading={isPending}
                        onClick={() => {
                            submitRef.current?.click()
                        }}
                    >
                        Подтвердить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </div>
            </BaseModalWindow>
        </Container>
    )
}
