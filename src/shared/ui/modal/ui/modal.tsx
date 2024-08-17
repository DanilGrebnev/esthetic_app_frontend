'use client'

import {
    useCloseIfClickOnEscapeKey,
    useToggleBodyOverflow,
} from '@/shared/ui/modal/hooks'
import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
    children?: ReactNode
}

/*
 * Модальное окно принимает объект со следующими полями:
 * @param {boolean} isOpen - состояние открытия / закрытия модального окна
 * @param {object} children - контент, отображаемый внутри модального окна
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
                      <div
                          onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              onClose?.()
                          }}
                          className={s['modal-container']}
                      >
                          {children}
                      </div>,
                      document.getElementById('modal-root') as HTMLElement,
                  )
                : null}
        </>
    )
}