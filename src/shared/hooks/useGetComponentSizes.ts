import { useEffect, useRef, useState } from 'react'

type Sizes = {
    width: number
    height: number
}

export const useGetComponentSizes = <T extends HTMLElement>() => {
    const [sizes, setSizes] = useState<Sizes | null>(null)
    const nodeRef = useRef<T>(null)

    useEffect(() => {
        if (!nodeRef.current) return
        const { current } = nodeRef
        setSizes({ width: current.offsetWidth, height: current.offsetHeight })
    }, [])

    return { width: sizes?.width, height: sizes?.height, nodeRef }
}
