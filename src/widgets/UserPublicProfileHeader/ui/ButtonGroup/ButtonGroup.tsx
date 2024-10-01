'use client'

import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

import s from './ButtonGroup.module.scss'
import { ButtonGroupSkeleton } from './ButtonGroupSkeleton'

interface ButtonGroupProps {
    userId: string
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ userId }) => {
    const { data, isPending } = useGetPublicProfileQuery({ userId })

    if (isPending) return <ButtonGroupSkeleton />

    return (
        <div className={s['btn-group']}>
            {data?.guest?.isOwner ? (
                <Button variant='silver'>Поделиться</Button>
            ) : (
                <Button variant='silver'>Подписаться</Button>
            )}
            {data?.guest?.isOwner ? (
                <Button
                    href={routes.editUserInfo.getRoute(userId)}
                    variant='silver'
                >
                    Изменить
                </Button>
            ) : (
                <Button variant='silver'>Написать</Button>
            )}
        </div>
    )
}
