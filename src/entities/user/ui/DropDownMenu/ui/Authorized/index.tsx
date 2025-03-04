'use client'

import { useLogoutMutation } from '@/shared/api/users'
import { routes } from '@/shared/routes'

import { DropDownItem } from '../DropDownItem/DropDownItem'

const Authorized = (props?: { userId?: string }) => {
    const { mutate } = useLogoutMutation()

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

export default Authorized
