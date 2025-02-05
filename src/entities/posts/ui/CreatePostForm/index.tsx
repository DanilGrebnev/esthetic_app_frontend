'use client'

import { type TCreatePosts } from '@/shared/types/posts'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { Tag } from '@/shared/ui/InputWithTags/types'
import { validationInputs } from '@/shared/validationInputs'
import { RefObject, forwardRef, memo, useCallback, useRef } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { UploadPostsContentWindow } from '../UploadPostsContentWindow'
import s from './s.module.scss'

interface CreatePostFormProps<T extends Record<string, any> = TCreatePosts> {
    mutate: ({ formData, data }: { formData: FormData; data: T }) => void
    isPending?: boolean
    postsEdit?: boolean
    submitBtnRef?: RefObject<HTMLButtonElement | null>
    defaultValues?: Omit<TCreatePosts, 'file' | 'aspectRatio'> & {
        tags: Tag[] | []
    }
}

export const CreatePostForm = memo(
    forwardRef<HTMLFormElement, CreatePostFormProps>((props, ref) => {
        const {
            mutate,
            isPending,
            postsEdit = false,
            submitBtnRef,
            defaultValues,
        } = props

        const {
            register,
            control,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
        } = useForm<TCreatePosts>({
            mode: 'onBlur',
            defaultValues: {
                /* Устанавливаем пустую строку по умолчанию, чтобы не было
                 перехода инпута из некотролируемого в контролируемый */
                name: defaultValues?.name ?? '',
                link: defaultValues?.link ?? '',
                description: defaultValues?.description ?? '',
            },
        })

        const formDataRef = useRef<FormData | null>(null)

        const onChangeTags = useCallback((tags: Tag[]) => {
            if (formDataRef.current) {
                formDataRef.current.set('tags', JSON.stringify(tags))
            }
        }, [])

        const onSubmit: SubmitHandler<TCreatePosts> = (data, e) => {
            if (isPending) return
            formDataRef.current = new FormData(e?.target)
            const formData = formDataRef.current

            const file = formData.get('file') as File

            if (!postsEdit && !file.size) {
                return setError('file', {
                    type: 'value',
                    message: 'file field is empty',
                })
            }

            mutate({ formData, data })
        }

        return (
            <form
                ref={ref}
                className={s.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {!postsEdit && (
                    <div className={s['left-col']}>
                        <UploadPostsContentWindow
                            clearErrors={clearErrors}
                            name='file'
                            isError={!!errors.file?.message}
                        />
                    </div>
                )}
                <div className={s['right-col']}>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label='Название'
                                placeholder='Добавить название'
                                variant='outlined'
                                error={!!errors.name?.message}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id='outlined-basic'
                                label='Добавить описание'
                                placeholder='Добавьте подробное описание'
                                multiline
                                minRows={5}
                                maxRows={10}
                                variant='outlined'
                            />
                        )}
                    />
                    <Controller
                        name='link'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id='outlined-basic'
                                label='Ссылка'
                                placeholder='Добавьте ссылку'
                                variant='outlined'
                            />
                        )}
                    />
                    <InputWithTags
                        defaultValue={defaultValues?.tags}
                        onChange={onChangeTags}
                    />
                </div>
                <button
                    ref={submitBtnRef}
                    type='submit'
                    hidden={true}
                />
            </form>
        )
    }),
)

CreatePostForm.displayName = 'CreatePostForm'
