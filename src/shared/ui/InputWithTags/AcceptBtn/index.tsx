import CheckmarkIcon from '@/shared/assets/checkmark.svg'
import { type FC, memo } from 'react'

import s from './s.module.scss'

interface AcceptBtnProps {
    onClick: () => void
}

export const AcceptBtn: FC<AcceptBtnProps> = memo((props) => {
    const { onClick } = props

    return (
        <button
            className={s.btn}
            onClick={onClick}
            type='button'
        >
            <CheckmarkIcon className={s.icon} />
        </button>
    )
})
AcceptBtn.displayName = 'AcceptBtn'
