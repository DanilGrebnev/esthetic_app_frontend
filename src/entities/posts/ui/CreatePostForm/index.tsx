'use client'

import { ValidationInputs } from '@/shared/ValidationInputs'
import { useCreateFormData } from '@/shared/hooks/useCreateFormData'
import { type CreatePost } from '@/shared/types/posts'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import {
    InputWithTags,
    type TInputWithTagsTagItemList,
} from '@/shared/ui/InputWithTags'
import { Select, type SelectType } from '@/shared/ui/Select'
import { clsx } from 'clsx'
import { FormEventHandler, useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import {
    useGetPostsFileSelector,
    usePostsSliceActions,
} from '../../model/slice'
import { UploadPostsContentWindow } from '../UploadPostsContentWindow'
import s from './s.module.scss'

const selectOptions = [
    { name: 'one', value: 'one' },
    { name: 'two', value: 'two' },
]

export const CreatePostForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, touchedFields },
    } = useForm<Omit<CreatePost, 'fileOptions' | 'tags'>>({ mode: 'onBlur' })

    // Передаём ссылку на кнопку отправки в хранилище
    const { setSubmitButtonRef } = usePostsSliceActions()
    const submitBtnRef = useRef<HTMLButtonElement | null>(null)
    useEffect(() => {
        if (!submitBtnRef) return
        setSubmitButtonRef(submitBtnRef)
    }, [setSubmitButtonRef])

    // Создаём конструктор FormData в области видимости компонента
    const formDataRef = useRef<FormData | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)

    const onChangeTags = useCallback(
        (tags: TInputWithTagsTagItemList) => {
            if (formDataRef.current) {
                formDataRef.current.set('tags', JSON.stringify(tags))
            }
        },
        [formDataRef],
    )

    const onSubmit = handleSubmit(() => {
        console.clear()
        if (!formRef.current) return
        formDataRef.current = new FormData(formRef.current)
        const formData = formDataRef.current

        for (let field of formData) {
            console.log(field)
        }
    })

    return (
        <Container size='m'>
            <form
                ref={formRef}
                className={s.form}
                onSubmit={onSubmit}
            >
                <div className={s['left-col']}>
                    <UploadPostsContentWindow
                        name='file'
                        isError={!!errors.file}
                    />
                </div>
                <div className={s['right-col']}>
                    <Input
                        label='Название'
                        placeholder='Добавить название'
                        variant='outlined'
                        {...register('name', {
                            required: ValidationInputs.required.message,
                        })}
                        error={!!errors.name?.message}
                        helperText={errors.name?.message}
                    />
                    <Input
                        id='outlined-basic'
                        label='Добавить описание'
                        placeholder='Добавьте подробное описание'
                        multiline
                        minRows={5}
                        maxRows={10}
                        variant='outlined'
                        {...register('description')}
                    />
                    <Input
                        label='Ссылка'
                        placeholder='Добавить ссылку'
                        variant='outlined'
                        {...register('link')}
                    />
                    <Select
                        label='Доска'
                        placeholder='Выбрать доску'
                        name='dashboard'
                    >
                        {selectOptions}
                    </Select>
                    <InputWithTags onChange={onChangeTags} />
                </div>
                <button
                    hidden={true}
                    type='submit'
                    ref={submitBtnRef}
                />
            </form>
        </Container>
    )
}

CreatePostForm.displayName = 'CreatePostForm'
