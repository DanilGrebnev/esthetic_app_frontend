import { UserAvatar } from '@/shared/ui/UserAvatar'

import s from './author-info.module.scss'

interface AuthorInfoProps {
    word?: string
    awatarSrc?: string | null
    firstName?: string
    lastName?: string
}

export const AuthorInfo = (props: AuthorInfoProps) => {
    const { firstName, lastName, awatarSrc, word } = props

    return (
        <div className={s['author-info']}>
            <UserAvatar
                word={word?.toUpperCase()}
                href={awatarSrc}
            />
            <div>
                <span>{firstName}</span> <span>{lastName}</span>
            </div>
        </div>
    )
}
