'use client'

import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useCloseIfClickOnEscapeKey, useToggleBodyOverflow } from '../hooks'
import { ModalProvider } from '../modalContext'

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

    useCloseIfClickOnEscapeKey(isOpen, onClose)
    useToggleBodyOverflow(isOpen)

    return (
        <>
            {isOpen
                ? createPortal(
                      <ModalProvider value={{ isOpen, onClose }}>
                          <ModalWrapper onClose={onClose}>
                              {children}
                          </ModalWrapper>
                      </ModalProvider>,
                      document.getElementById('modal-root') as HTMLElement,
                  )
                : null}
        </>
    )
}
