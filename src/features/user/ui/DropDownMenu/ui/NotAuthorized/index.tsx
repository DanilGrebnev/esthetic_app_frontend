import { routes } from '@/shared/routes'

import { DropDownItem } from '../DropDownItem/DropDownItem'

const NotAuthorized = () => {
    return (
        <>
            <DropDownItem href={routes.registration.getRoute()}>
                Зарегистрироваться
            </DropDownItem>
            <DropDownItem href={routes.login.getRoute()}>Войти</DropDownItem>
        </>
    )
}

export default NotAuthorized
