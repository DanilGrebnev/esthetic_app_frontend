'use client'

import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import s from './ButtonGroup.module.scss'
import { ButtonGroupSkeleton } from './ButtonGroupSkeleton'

interface ButtonGroupProps {
    userId: string
}

export const ButtonGroup = ({ userId }: ButtonGroupProps) => {
    const { data, isPending } = useGetPublicProfileQuery({ userId })

    const copyProfileURL = useCallback(() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success('Ссылка на профиль скопирована')
        })
    }, [])

    if (isPending) return <ButtonGroupSkeleton />

    return (
        <div className={s['btn-group']}>
            <Button
                variant='silver'
                onClick={copyProfileURL}
            >
                Поделиться
            </Button>
            {data?.guest?.isOwner ? (
                <Button
                    href={routes.editUserInfo.getRoute(userId)}
                    variant='silver'
                >
                    Изменить
                </Button>
            ) : (
                <Button variant='silver'>Подписаться</Button>
            )}
        </div>
    )
}
