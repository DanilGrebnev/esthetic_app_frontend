'use client'

import { useCreateDashboardMutation } from '@/shared/api/dashboards'
import { BaseResponseType } from '@/shared/types/apiResponses'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { BaseModalWindow, Modal } from '@/shared/ui/modal'
import { type FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import s from './CreateDashboardButton.module.scss'

interface CreateDashboardButtonProps {
    userId?: string
}

interface IForm {
    dashboardName: string
}

export const CreateDashboardButton: FC<CreateDashboardButtonProps> = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        formState: { errors },
    } = useForm<IForm>({
        mode: 'onBlur',
    })

    const [openModal, setOpenModal] = useState(false)

    const { mutateAsync, isPending } = useCreateDashboardMutation()

    const onCloseModal = useCallback(() => {
        setOpenModal(false)
        reset()
    }, [reset])

    function setErrorIfDuplicateBoardName(err: BaseResponseType) {
        if (err.status === 400) {
            setError('dashboardName', {
                message: err.message,
            })
        }
    }

    const value = watch('dashboardName')

    return (
        <div className={s.wrapper}>
            <button
                className={s['dashboard-icon']}
                onClick={() => setOpenModal(true)}
            ></button>
            <Modal
                onClose={onCloseModal}
                isOpen={openModal}
            >
                <BaseModalWindow>
                    <form
                        onSubmit={handleSubmit((data) => {
                            mutateAsync(data.dashboardName)
                                .then(onCloseModal)
                                .catch(setErrorIfDuplicateBoardName)
                        })}
                        className={s.modal}
                    >
                        <h2 className={s.title}>Создание доски</h2>
                        <Input
                            {...register('dashboardName', {
                                maxLength: {
                                    value: 30,
                                    message: 'Макс.длинна: 30 символов',
                                },
                            })}
                            helperText={errors.dashboardName?.message}
                            error={!!errors.dashboardName}
                            placeholder='Введите название доски'
                            label='Название доски'
                        />
                        <div className={s['btn-group']}>
                            <Button
                                loading={isPending}
                                disabled={
                                    value?.length < 2 ||
                                    !value ||
                                    value.length > 30
                                }
                                type='submit'
                            >
                                Создать
                            </Button>
                            <Button onClick={onCloseModal}>Отменить</Button>
                        </div>
                    </form>
                </BaseModalWindow>
            </Modal>
        </div>
    )
}

CreateDashboardButton.displayName = 'CreateDashboardButton'
