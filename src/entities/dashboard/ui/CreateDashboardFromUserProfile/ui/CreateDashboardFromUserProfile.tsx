'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/modal'
import { type FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import s from './CreateDashboardFromUserProfile.module.scss'

interface CreateDashboardFromUserProfileProps {
    userId?: string
}

export const CreateDashboardFromUserProfile: FC<
    CreateDashboardFromUserProfileProps
> = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<{ dashboardName: string }>({ mode: 'onBlur' })

    const { userId } = props

    const [openModal, setOpenModal] = useState(false)

    const onOpenModal = () => {
        setOpenModal(true)
    }

    const onCloseModal = useCallback(() => {
        setOpenModal(false)
        reset()
    }, [])

    const value = watch('dashboardName')

    return (
        <div className={s.wrapper}>
            <div
                className={s['dashboard-icon']}
                onClick={onOpenModal}
            ></div>
            <Modal
                onClose={onCloseModal}
                isOpen={openModal}
            >
                <form
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
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
                            disabled={value?.length < 2 || !value}
                            type='submit'
                        >
                            Создать
                        </Button>
                        <Button onClick={onCloseModal}>Отменить</Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

CreateDashboardFromUserProfile.displayName = 'CreateDashboardFromUserProfile'
