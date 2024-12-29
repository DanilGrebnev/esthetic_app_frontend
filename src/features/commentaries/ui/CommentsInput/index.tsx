'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { SendCommentsBtn } from '../SendCommentsBtn'
import s from './comments-field.module.scss'

interface CommentsFieldProps {
    startWithText?: string
    onSubmit?: (text: string) => void | ((text: string) => Promise<void>)
}

export const CommentsField = (props: CommentsFieldProps) => {
    const { startWithText = '' } = props

    const [focus, setOnFocus] = useState(false)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<{ text: string }>({ values: { text: startWithText } })

    const onFocus = () => {
        setOnFocus(true)
    }

    const onSubmit = handleSubmit((data) => {
        props?.onSubmit?.(data.text)
    })

    return (
        <div
            className={clsx(s['input-container'], {
                [s['on-focus-field']]: focus,
            })}
        >
            <Controller
                control={control}
                name='text'
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <textarea
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={() => {
                                onBlur()
                                setOnFocus(false)
                            }}
                            className={s.textarea}
                            placeholder='Добавить комментарий'
                        />
                    )
                }}
            />
            <SendCommentsBtn onClick={onSubmit} />
        </div>
    )
}
