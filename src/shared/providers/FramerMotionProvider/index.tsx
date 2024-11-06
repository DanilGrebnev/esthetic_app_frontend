import { LazyMotion, domAnimation } from 'framer-motion'
import { ReactNode } from 'react'

export const FramerMotionProvider = ({ children }: { children: ReactNode }) => {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
