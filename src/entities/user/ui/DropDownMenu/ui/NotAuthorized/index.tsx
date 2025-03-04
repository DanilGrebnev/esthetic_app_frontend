'use client'

import { LoginForm } from '@/features/SignIn/LoginForm'
import { routes } from '@/shared/routes'
import { Modal } from '@/shared/ui/modal'
import { useState } from 'react'

import { DropDownItem } from '../DropDownItem/DropDownItem'

const NotAuthorized = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false)

    return (
        <>
            <DropDownItem href={routes.registration.getRoute()}>
                Зарегистрироваться
            </DropDownItem>
            <DropDownItem
                onClick={() => {
                    setOpenLoginModal(true)
                }}
            >
                Войти
            </DropDownItem>
            <Modal
                isOpen={openLoginModal}
                onClose={() => {
                    setOpenLoginModal(false)
                }}
            >
                <LoginForm
                    onSuccess={() => {
                        setOpenLoginModal(false)
                    }}
                />
            </Modal>
        </>
    )
}

export default NotAuthorized
