import { useEffect, useLayoutEffect, useRef } from 'react'

interface TUseOutsideClick {
    handler: () => void
    attached?: boolean
}

/**
 * хук, отлавливающий нажатия мимо нужного node элемента
 * @param handler функция, которая будет вызвана, если событие произошло вне elementRef
 * @param attached если false, то вся логика не будет работать. К примеру,
 * если в attached передать флаг isOpen, и он будет равен false,
 * то обработчик события не будет вешаться на документ, а текущий обработчик события будет удалён
 */
export const useOutsideClick = ({
    handler,
    attached = true,
}: TUseOutsideClick) => {
    const elementRef = useRef<any>(null)
    const handlerRef = useRef<any>(null)

    useLayoutEffect(() => {
        handlerRef.current = handler
    }, [handler])

    useEffect(() => {
        if (!attached) return

        const handleClick = (e: any) => {
            if (!elementRef?.current) return
            if (!elementRef?.current.contains(e.target)) {
                handlerRef.current?.()
            }
        }

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return
            handlerRef.current?.()
        }

        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [elementRef, attached])

    return { elementRef }
}
