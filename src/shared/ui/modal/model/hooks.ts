import { useCallback, useEffect, useLayoutEffect } from 'react'

/* Устанавливает body одно из двух значений overflow: auto || hidden в зависимости от состояния isOpen */
// export const useToggleBodyOverflow = (isOpen: boolean) => {
//     useLayoutEffect(() => {
//         const body = document.querySelector('body')
//         if (!body) return
//         if (isOpen) {
//             body.style.overflow = 'hidden'
//         } else {
//             body.style.overflow = 'auto'
//         }
//     }, [isOpen])
// }

/* Закрытие модального окна, если происходит нажатие на клавишу Escape */
export const useCloseIfClickOnEscapeKey = (
    isOpen: boolean,
    onClose?: () => void,
) => {
    const closeOnEscapeKeyClick = useCallback(
        (e: any) => {
            if (e.key === 'Escape') {
                onClose?.()
            }
        },
        [onClose],
    )

    useEffect(() => {
        // Вешаем обработчик события для обработки нажатия клавишь
        if (isOpen) {
            document.addEventListener('keydown', closeOnEscapeKeyClick)
        }

        return () => {
            document.removeEventListener('keydown', closeOnEscapeKeyClick)
        }
    }, [isOpen, closeOnEscapeKeyClick])
}
