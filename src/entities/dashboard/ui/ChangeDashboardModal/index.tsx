'use client'

import { useChangeDashboardMutation } from '@/shared/api/dashboards'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { BaseModalWindow, useModalContext } from '@/shared/ui/modal'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import s from './s.module.scss'

interface ChangeDashboardModalProps {
    dashboardId: string
    dashboardName: string
}

interface ChangeDashboardFields {
    dashboardName: string
}

export const ChangeDashboardModal = (props: ChangeDashboardModalProps) => {
    const { dashboardId, dashboardName } = props
    const { onClose } = useModalContext()

    const {
        control,
        handleSubmit,

        watch,
        formState: { defaultValues },
    } = useForm<ChangeDashboardFields>({
        mode: 'all',
        defaultValues: {
            dashboardName,
        },
    })

    const { mutate, isPending } = useChangeDashboardMutation()

    const submitChangeForm = handleSubmit(({ dashboardName }) => {
        mutate(
            { dashboardId, dashboardName },
            {
                onSuccess: () => {
                    toast.success('Доска изменена')
                    onClose?.()
                },
                onError: () => {
                    toast.error('Ошибка изменения доски')
                },
            },
        )
    })

    return (
        <BaseModalWindow className={s.container}>
            <p>Изменение доски</p>
            <Controller
                control={control}
                rules={{ required: 'Название доски не может быть пустым' }}
                name='dashboardName'
                render={({
                    field: { onChange, value, onBlur, name },
                    formState: { errors },
                }) => (
                    <Input
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder='Введите название доски'
                        label='Название доски'
                        error={!!errors.dashboardName?.message}
                        helperText={errors.dashboardName?.message}
                    />
                )}
            />

            <div className={s.btn_group}>
                <Button
                    loading={isPending}
                    disabled={
                        watch('dashboardName') === defaultValues?.dashboardName
                    }
                    variant='silver'
                    onClick={submitChangeForm}
                >
                    Изменить
                </Button>
                <Button
                    disabled={isPending}
                    onClick={onClose}
                    variant='standart'
                >
                    Отмена
                </Button>
            </div>
        </BaseModalWindow>
    )
}
