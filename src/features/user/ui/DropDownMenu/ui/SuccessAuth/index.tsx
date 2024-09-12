'use client'

import { useMutationLogout } from '@/shared/api/users'
import { routes } from '@/shared/routes'

import { DropDownItem } from '../DropDownItem/DropDownItem'

export const SuccessAuth = (props?: { userId?: string }) => {
    const { mutate } = useMutationLogout()

    return (
        <>
            <DropDownItem
                href={routes.userCreatedPosts.getRoute(props?.userId)}
            >
                Перейти в профиль
            </DropDownItem>
            <DropDownItem onClick={mutate}>Выйти</DropDownItem>
        </>
    )
}
