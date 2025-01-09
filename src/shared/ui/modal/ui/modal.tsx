'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from 'usehooks-ts'

import { useCloseIfClickOnEscapeKey } from '../model/hooks'
import { ModalProvider } from '../model/ModalProvider/ModalProvider'

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

    const { lock, unlock } = useScrollLock({
        autoLock: false,
    })

    useCloseIfClickOnEscapeKey(isOpen, onClose)
    // useToggleBodyOverflow(isOpen)

    useEffect(() => {
        if (openModal) {
            lock()
        } else {
            unlock()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal])

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
