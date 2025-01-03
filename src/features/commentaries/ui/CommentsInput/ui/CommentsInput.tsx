'use client'

import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { SendCommentsBtn } from './SendCommentsBtn'
import s from './comments-field.module.scss'

interface CommentsFieldProps {
    startWithText?: string
    onSubmit?: (text: string) => Promise<any>
    disabled?: boolean
    onSuccessSubmit?: () => void
    onErrorSubmit?: () => void
}

export const CommentsField = (props: CommentsFieldProps) => {
    const {
        startWithText = '',
        disabled,
        onErrorSubmit,
        onSuccessSubmit,
    } = props
    const [focus, setOnFocus] = useState(false)

    const { elementRef } = useOutsideClick({
        handler: () => setOnFocus(false),
        attached: focus,
    })

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors, isValid },
    } = useForm<{ text: string }>({
        values: { text: startWithText },
        mode: 'all',
    })

    const onFocus = () => {
        setOnFocus(true)
    }

    const onSubmit = handleSubmit((data) => {
        props
            ?.onSubmit?.(data.text)
            .then(() => {
                /** Очищаем поле комментария */
                setValue('text', '')
                onSuccessSubmit?.()
            })
            .catch(() => {
                onErrorSubmit?.()
            })
    })

    const text = watch('text')

    useEffect(() => {
        reset()
    }, [])

    useEffect(() => {
        /** Уменьшаем окно ввода комментария, если нет текста */
        if (!text) {
            setOnFocus(false)
        }
    }, [text])

    return (
        <div
            ref={elementRef}
            className={clsx(s['input-container'], {
                [s['on-focus-field']]: focus,
                [s.disabled]: disabled,
            })}
        >
            <Controller
                control={control}
                name='text'
                rules={{
                    minLength: { value: 2, message: 'Минимальная длинна 2' },
                    maxLength: 200,
                    required: 'Обязательно ёпт',
                }}
                render={({ field }) => {
                    return (
                        <textarea
                            {...field}
                            className={s.textarea}
                            onFocus={onFocus}
                            placeholder='Добавить комментарий'
                        />
                    )
                }}
            />
            <SendCommentsBtn
                disabled={!isValid}
                onClick={onSubmit}
            />
        </div>
    )
}
