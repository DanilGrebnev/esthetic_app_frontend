'use client'

import {
    useCloseIfClickOnEscapeKey,
    useToggleBodyOverflow,
} from '@/shared/ui/modal/hooks'
import { ModalProvider } from '@/shared/ui/modal/modalContext'
import { type ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

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

function ModalWrapper({
    children,
    onClose,
}: {
    children: ReactNode
    onClose?: () => void
}) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                onClose?.()
            }}
            className={s['modal-bg-filter']}
        >
            {children}
        </div>
    )
}
