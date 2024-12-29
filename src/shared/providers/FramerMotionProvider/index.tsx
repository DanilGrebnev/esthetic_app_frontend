import { LazyMotion, domAnimation } from 'motion/react'
import { ReactNode } from 'react'

export const FramerMotionProvider = ({ children }: { children: ReactNode }) => {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
