import clsx from 'clsx'
import { HTMLAttributes } from 'react'

import s from './skeleton.module.scss'

interface TSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = (props: TSkeletonProps) => {
    const { className } = props

    return (
        <div
            {...props}
            className={clsx(s.skeleton, className)}
        ></div>
    )
}
