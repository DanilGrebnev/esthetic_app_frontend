'use client'

import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags/Input'
import { Select } from '@/shared/ui/Select'
import { ChangeEvent, FormEvent, useCallback } from 'react'

import { usePostsSlice } from '../../model/slice'
import { PreviewImageRedactor } from '../PreviewImageRedactor'
import { UploadPostsContentWindow } from '../UploadPostsContentWindow'
import s from './s.module.scss'

const selectOptions = [
    { name: 'one', value: 'one' },
    { name: 'two', value: 'two' },
]

export const CreatePostForm = () => {
    const setPosts = usePostsSlice((state) => state.setPostsData)
    const data = usePostsSlice((state) => state.postsData)

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        console.log('values', formData.values())
    }

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPosts(e.target.name, e.target.value)
        },
        [setPosts],
    )

    return (
        <Container size='m'>
            <form
                className={s.form}
                onSubmit={submit}
            >
                <div className={s['left-col']}>
                    {!data.image ? (
                        <UploadPostsContentWindow />
                    ) : (
                        <PreviewImageRedactor />
                    )}
                </div>
                <div className={s['right-col']}>
                    <Input
                        id='outlined-basic'
                        label='Название'
                        placeholder='Добавить название'
                        variant='outlined'
                        name='name'
                        onChange={onChange}
                    />
                    <Input
                        id='outlined-basic'
                        label='Добавить описание'
                        placeholder='Добавьте подробное описание'
                        multiline
                        minRows={5}
                        maxRows={10}
                        variant='outlined'
                        name='description'
                        onChange={onChange}
                    />
                    <Input
                        id='outlined-basic'
                        label='Ссылка'
                        placeholder='Добавить ссылку'
                        variant='outlined'
                        name='link'
                        onChange={onChange}
                    />

                    <Select
                        onChange={({ name, value }) => {
                            setPosts(name, value)
                        }}
                        label='Доска'
                        placeholder='Выбрать доску'
                        name='dashboard'
                    >
                        {selectOptions}
                    </Select>
                    <InputWithTags onChange={(values) => console.log(values)} />
                </div>
            </form>
        </Container>
    )
}
