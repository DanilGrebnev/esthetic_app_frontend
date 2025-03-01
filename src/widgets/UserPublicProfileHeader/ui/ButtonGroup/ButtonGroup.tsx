'use client'

import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'

import s from './ButtonGroup.module.scss'
import { ButtonGroupSkeleton } from './ButtonGroupSkeleton'

interface ButtonGroupProps {
    userId: string
}

export const ButtonGroup = ({ userId }: ButtonGroupProps) => {
    const { data, isPending } = useGetPublicProfileQuery({ userId })
    const [, copy] = useCopyToClipboard()

    const copyProfileURL = () => {
        copy(window.location.href)
            .then(() => {
                toast.success('Ссылка на профиль скопирована')
            })
            .catch(() => {
                toast.error('Ошибка копирования профиля')
            })
    }

    if (isPending) return <ButtonGroupSkeleton />

    return (
        <div className={s.btn_group}>
            <Button
                title='Поделить профилем'
                variant='silver'
                onClick={copyProfileURL}
            >
                Поделиться
            </Button>
            {data?.guest?.isOwner ? (
                <Button
                    title='Редактировать профиль'
                    href={routes.editUserInfo.getRoute(userId)}
                    variant='silver'
                >
                    Редактировать
                </Button>
            ) : (
                <Button variant='silver'>Подписаться</Button>
            )}
        </div>
    )
}
