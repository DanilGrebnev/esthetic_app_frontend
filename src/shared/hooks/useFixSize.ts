import { useEffect, useRef, useState } from 'react'

type sizeType = { width: string; height: string }

/* Получает размеры компонент и фиксирует их */
export const useFixSize = <T extends HTMLElement>() => {
    const [size, setSize] = useState<sizeType | null>(null)
    const nodeRef = useRef<T>(null)

    useEffect(() => {
        if (!nodeRef.current) return
        const width = nodeRef.current.offsetWidth
        const height = nodeRef.current.offsetHeight
        setSize({ width: width + 'px', height: height + 'px' })
    }, [])

    const style = !size
        ? undefined
        : { maxWidth: size.width, height: size.height }

    return { nodeRef, size, style }
}
