'use client'

import { type TCreatePosts } from '@/shared/types/posts'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { Tag } from '@/shared/ui/InputWithTags/types'
import { Select } from '@/shared/ui/Select'
import { validationInputs } from '@/shared/validationInputs'
import { MutableRefObject, forwardRef, memo, useCallback, useRef } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { UploadPostsContentWindow } from '../UploadPostsContentWindow'
import s from './s.module.scss'

interface CreatePostFormProps {
    mutate: (formData: FormData) => void
    isPending?: boolean
    postsEdit?: boolean
    submitBtnRef?: MutableRefObject<HTMLButtonElement | null>
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
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
        } = useForm<TCreatePosts>({
            mode: 'onBlur',
            defaultValues: {
                name: defaultValues?.name,
                link: defaultValues?.link,
                description: defaultValues?.description,
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

            mutate(formData)
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
                    <Input
                        label='Название'
                        placeholder='Добавить название'
                        variant='outlined'
                        {...register('name', {
                            required: validationInputs.required.message,
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
                    {/* <Select
                        label='Доска'
                        placeholder='Выбрать доску'
                        name='dashboard'
                    >
                        {dashboardsList}
                    </Select> */}
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
