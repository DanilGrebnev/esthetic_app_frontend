import { clsx } from 'clsx'

import s from './s.module.scss'

interface ResponseInfoProps {
    firstName?: string
    lastName?: string
    className?: string
}
export const ResponseInfo = (props: ResponseInfoProps) => {
    const { firstName, lastName, className } = props

    return (
        <p className={clsx(s['response-info'], className)}>
            {clsx('в ответ:', firstName, lastName)}
        </p>
    )
}
