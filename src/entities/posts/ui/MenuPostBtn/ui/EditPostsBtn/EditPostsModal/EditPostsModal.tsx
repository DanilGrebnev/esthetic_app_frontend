'use client'

import { CreatePostForm } from '@/entities/posts'
import { useMenuPostBtnContext } from '@/entities/posts/ui/MenuPostBtn/ui/MenuPostBtnContext'
import {
    useGetDetailPostsQuery,
    useUpdatePostsMutation,
} from '@/shared/api/posts'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { BaseModalWindow } from '@/shared/ui/modal'
import { type FC, useRef } from 'react'

import s from './EditPostsModal.module.scss'

interface EditPostsModalProps {}

export const EditPostsModal: FC<EditPostsModalProps> = () => {
    const { postsId } = useMenuPostBtnContext()
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const { data: privateProfile } = useGetPrivateProfileQuery()

    const { data: postData } = useGetDetailPostsQuery(postsId)

    const { mutate: editPost, isPending } = useUpdatePostsMutation({
        userId: privateProfile?.userId ?? '',
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
                        editPost({ body: formData, postsId })
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
                    <Button>Отмена</Button>
                </div>
            </BaseModalWindow>
        </Container>
    )
}
