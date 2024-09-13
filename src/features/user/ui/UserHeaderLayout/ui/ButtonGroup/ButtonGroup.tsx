import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

import s from './ButtonGroup.module.scss'

interface ButtonGroupProps {
    isOwner?: boolean
    userId?: string
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ isOwner, userId }) => {
    return (
        <div className={s['btn-group']}>
            {isOwner ? (
                <Button variant='silver'>Поделиться</Button>
            ) : (
                <Button variant='silver'>Подписаться</Button>
            )}
            <Button
                href={routes.editUserInfo.getRoute(userId)}
                variant='silver'
            >
                Изменить
            </Button>
        </div>
    )
}
