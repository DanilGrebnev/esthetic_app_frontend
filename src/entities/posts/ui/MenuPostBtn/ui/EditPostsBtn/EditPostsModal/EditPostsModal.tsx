'use client'

import { CreatePostForm } from '@/entities/posts'
import {
    useGetDetailPostsQuery,
    useUpdatePostsMutation,
} from '@/shared/api/posts'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { BaseModalWindow, useModalContext } from '@/shared/ui/modal'
import { type FC, useRef } from 'react'

import { useMenuPostBtnContext } from '../../MenuPostBtnContext'
import s from './EditPostsModal.module.scss'

export const EditPostsModal: FC = () => {
    const { postsId } = useMenuPostBtnContext()
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const { onClose } = useModalContext()

    const { data: profileByCookie } = useGetProfileByCookieQuery()

    const { data: postData } = useGetDetailPostsQuery(postsId)

    const { mutateAsync: editPost, isPending } = useUpdatePostsMutation({
        userId: profileByCookie?.userId ?? '',
        postsId,
    })

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
                    mutate={(formData) => {
                        editPost({ body: formData, postsId }).then(onClose)
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
