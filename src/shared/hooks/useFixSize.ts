import { useEffect, useRef, useState } from 'react'

type TSizeType = { width: string; height: string }

/* Получает размеры компонента и фиксирует их */
export const useFixSize = <T extends HTMLElement>() => {
    const [size, setSize] = useState<TSizeType | null>(null)
    const nodeRef = useRef<T>(null)
    const styleRef = useRef<TSizeType | null>(null)

    const fixWidthStyle = {
        minWidth: styleRef?.current?.width,
        maxWidth: styleRef?.current?.width,
    }

    const fixHeightStyle = {
        minHeight: styleRef?.current?.height,
        maxHeight: styleRef?.current?.height,
    }

    useEffect(() => {
        if (!nodeRef.current) return
        const width = nodeRef.current.offsetWidth
        const height = nodeRef.current.offsetHeight

        const size = { width: width + 'px', height: height + 'px' }
        setSize(size)

        styleRef.current = size
    }, [])

    return {
        nodeRef,
        size,
        styleRef,
        fixWidthStyle,
        fixHeightStyle,
        width: size?.width,
    }
}
