import { routes } from '@/shared/routes'
import { TCommentsAnswerInfo } from '@/shared/types/comments'
import clsx from 'clsx'
import Link from 'next/link'

import s from './answer-info.module.scss'

export const AnswerInfo = (props: TCommentsAnswerInfo) => {
    const { firstName, userId } = props

    return (
        <span className={s.answer}>
            {' '}
            <span>в ответ</span>{' '}
            <Link
                className={clsx(s.name, 'bottom-line')}
                href={routes.userDashboards.getRoute(userId)}
            >
                {firstName}
            </Link>
        </span>
    )
}
