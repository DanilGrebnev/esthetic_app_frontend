'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useCloseIfClickOnEscapeKey, useToggleBodyOverflow } from '../hooks'
import { ModalProvider } from './ModalProvider/modalContext'

const ModalWrapper = dynamic(
    () => import(/* webpackChunkName: "ModalWrapper" */ './ModalWrapper'),
    {
        ssr: false,
    },
)

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
    children?: ReactNode
}

/*
 * Модальное окно:
 * @param isOpen - состояние открытия / закрытия модального окна
 * @param children - контент, отображаемый внутри модального окна
 * @callback onClose - функция, которая будет вызываться при закрытии модального кона
 * */
export const Modal = (props: ModalProps) => {
    const { children, isOpen, onClose } = props
    const [openModal, setOpenModal] = useState(false)

    const timeOutRef = useRef<NodeJS.Timeout | null>(null)

    useCloseIfClickOnEscapeKey(isOpen, onClose)
    useToggleBodyOverflow(isOpen)

    useEffect(() => {
        if (isOpen) {
            setOpenModal(true)
            clearTimeout(timeOutRef?.current as any)
            return
        }

        if (!isOpen && openModal) {
            timeOutRef.current = setTimeout(setOpenModal, 300, false)
        }
    }, [isOpen, openModal])

    return (
        <>
            {openModal
                ? createPortal(
                      <ModalProvider value={{ isOpen, onClose }}>
                          <ModalWrapper>{children}</ModalWrapper>
                      </ModalProvider>,
                      document.getElementById('modal-root') as HTMLElement,
                  )
                : null}
        </>
    )
}
