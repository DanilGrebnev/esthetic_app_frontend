'use client'

import {
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
    children?: ReactNode
}

export const Modal = (props: ModalProps) => {
    const { children, isOpen, onClose } = props

    const closeOnEscapeKeyClick = useCallback(
        (e: any) => {
            console.log(e.key)
            if (e.key === 'Escape') {
                onClose?.()
            }
        },
        [onClose],
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', closeOnEscapeKeyClick)
        }
        if (!isOpen) {
            document.removeEventListener('keydown', closeOnEscapeKeyClick)
        }

        return () => {
            document.removeEventListener('keydown', closeOnEscapeKeyClick)
        }
    }, [isOpen])

    const modalRootRef = useRef<HTMLElement | null>(null)
    const bodyRef = useRef<HTMLElement | null>(null)

    useLayoutEffect(() => {
        bodyRef.current = document.querySelector('body')
        modalRootRef.current = document.getElementById('modal-root')
    }, [])

    useLayoutEffect(() => {
        if (!bodyRef.current) return
        if (isOpen) {
            bodyRef.current.style.overflow = 'hidden'
        } else {
            bodyRef.current.style.overflow = 'auto'
        }
    }, [isOpen])

    return isOpen
        ? createPortal(
              <div
                  onClick={onClose}
                  className={s['modal-container']}
              >
                  {children}
              </div>,
              modalRootRef.current as HTMLElement,
          )
        : null
}
