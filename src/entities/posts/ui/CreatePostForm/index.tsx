'use client'

import { ValidationInputs } from '@/shared/ValidationInputs'
import { useCreatePostsMutation } from '@/shared/api/posts/postsApiHooks'
import { type TCreatePosts } from '@/shared/types/posts'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { Tag } from '@/shared/ui/InputWithTags/types'
import { Select } from '@/shared/ui/Select'
import { forwardRef, useCallback, useRef } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { UploadPostsContentWindow } from '../UploadPostsContentWindow'
import s from './s.module.scss'

const selectOptions = [
    { name: 'one', value: 'one' },
    { name: 'two', value: 'two' },
]

export const CreatePostForm = forwardRef<HTMLButtonElement>((_, ref) => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<TCreatePosts>({ mode: 'onBlur' })
    const { mutateAsync } = useCreatePostsMutation()

    // Создаём конструктор FormData в области видимости компонента
    const formDataRef = useRef<FormData | null>(null)

    const onChangeTags = useCallback((tags: Tag[]) => {
        if (formDataRef.current) {
            formDataRef.current.set('tags', JSON.stringify(tags))
        }
    }, [])

    const onSubmit: SubmitHandler<TCreatePosts> = (data, e) => {
        formDataRef.current = new FormData(e?.target)
        const formData = formDataRef.current
        const file = formData.get('file') as File
        const aspectRatio = formData?.get('aspectRatio')
        formData?.delete('aspectRatio')

        formData?.set(
            'fileOptions',
            JSON.stringify({
                objectPosition: 'center',
                aspectRatio: aspectRatio,
            }),
        )

        // const tags = JSON.parse(formData?.get('tags') as string)

        if (!file.size) {
            return setError('file', {
                type: 'value',
                message: 'file field is empty',
            })
        }

        mutateAsync(formData)

        // for (let field of formData) {
        //     console.log(field)
        // }
    }

    return (
        <Container size='m'>
            <form
                className={s.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={s['left-col']}>
                    <UploadPostsContentWindow
                        clearErrors={clearErrors}
                        name='file'
                        isError={!!errors.file?.message}
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
                    ref={ref}
                />
            </form>
        </Container>
    )
})

CreatePostForm.displayName = 'CreatePostForm'
