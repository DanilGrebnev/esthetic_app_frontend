import { routes } from '@/shared/routes'

import { DropDownItem } from '../DropDownItem/DropDownItem'

export const NotAuthorized = () => {
    return (
        <>
            <DropDownItem href={routes.registration.getRoute()}>
                Зарегистрироваться
            </DropDownItem>
            <DropDownItem href={routes.login.getRoute()}>Войти</DropDownItem>
        </>
    )
}
