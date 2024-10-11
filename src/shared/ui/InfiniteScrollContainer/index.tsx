import { type FC, ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type InViewOptions = Parameters<typeof useInView>[0]

interface InfiniteScrollContainerProps {
    children?: ReactNode
    action?: () => void
}

export const InfiniteScrollContainer: FC<
    InfiniteScrollContainerProps & InViewOptions
> = (props) => {
    const { children, action, ...other } = props

    const { ref, inView } = useInView({ threshold: 0.1, ...other })

    useEffect(() => {
        if (inView) {
            action?.()
        }
    }, [inView])

    return (
        <>
            {children}
            <div
                ref={ref}
                style={{ height: '50px' }}
            ></div>
        </>
    )
}
