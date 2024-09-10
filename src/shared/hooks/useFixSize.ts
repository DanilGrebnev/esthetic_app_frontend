import { useEffect, useRef, useState } from 'react'

type sizeType = { width: string; height: string }

/* Получает размеры компонент и фиксирует их */
export const useFixSize = <T extends HTMLElement>() => {
    const [size, setSize] = useState<sizeType | null>(null)
    const nodeRef = useRef<T>(null)
    const styleRef = useRef<sizeType | null>(null)

    const fixWidthStyle = {
        minWidth: styleRef?.current?.width,
        maxWidth: styleRef?.current?.width,
    }

    useEffect(() => {
        if (!nodeRef.current) return
        const width = nodeRef.current.offsetWidth
        const height = nodeRef.current.offsetHeight

        const size = { width: width + 'px', height: height + 'px' }
        setSize(size)

        styleRef.current = size
    }, [])

    return { nodeRef, size, styleRef, fixWidthStyle, width: size?.width }
}
