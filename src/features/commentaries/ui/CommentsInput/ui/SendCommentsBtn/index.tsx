import SendIcon from '@/shared/assets/send-icon.svg'
import clsx from 'clsx'

import s from './s.module.scss'

interface SendCommentsBtnProps {
    loading?: boolean
    disabled?: boolean
    onClick?: () => void
}
export const SendCommentsBtn = (props: SendCommentsBtnProps) => {
    const { loading, disabled, onClick } = props

    return (
        <SendIcon
            onClick={onClick}
            className={clsx(s.btn, { [s.disabled]: disabled })}
        />
    )
}
