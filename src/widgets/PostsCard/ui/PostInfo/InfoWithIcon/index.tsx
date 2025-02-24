import CommentIcon from '@/shared/assets/comment-icon.svg'
import HeartIcon from '@/shared/assets/heart-icon.svg'

import s from './info-with-icon.module.scss'

type TIcon = 'comment' | 'heart'

interface InfoWithIconProps {
    text: string | number
    icon: TIcon
}

const Icon = (props: { variant: TIcon; className?: string }) => {
    const { variant, ...other } = props
    const icon = {
        heart: HeartIcon,
        comment: CommentIcon,
    }

    return icon[variant].call(null, { ...other })
}

export const InfoWithIcon = (props: InfoWithIconProps) => {
    const { icon, text } = props
    return (
        <div className={s.wrapper}>
            <Icon
                variant={icon}
                className={s.icon}
            />
            <p className={s.text}>{text}</p>
        </div>
    )
}
