import CheckmarkIcon from '@/shared/assets/checkmark.svg'
import { type FC } from 'react'

import s from './s.module.scss'

interface AcceptBtnProps {
    onClick: () => void
}

export const AcceptBtn: FC<AcceptBtnProps> = (props) => {
    const { onClick } = props

    return (
        <button
            className={s.btn}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
        >
            <CheckmarkIcon className={s.icon} />
        </button>
    )
}
