import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import s from './buttons.module.scss'

interface AnswerBtnProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const AnswerBtn = (props: AnswerBtnProps) => {
    const { onClick } = props

    return (
        <button
            onClick={onClick}
            className={clsx(s.btn, s['answer-btn'])}
        >
            Ответить
        </button>
    )
}
