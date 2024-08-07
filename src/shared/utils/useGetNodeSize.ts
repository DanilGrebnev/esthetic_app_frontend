import { RefObject, useEffect, useRef, useState } from 'react'

export const useGetnNodeSize = <
    T extends { offsetHeight: number; offsetWidth: number },
>(
    nodeSize: 'offsetWidth' | 'offsetHeight' = 'offsetWidth',
) => {
    const [size, setSize] = useState(0)

    const nodeRef = useRef<T>(null)

    useEffect(() => {
        if (!nodeRef.current) return

        setSize(nodeRef?.current[nodeSize])
    }, [nodeSize])

    return { nodeRef, size }
}
