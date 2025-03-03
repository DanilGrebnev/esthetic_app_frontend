import { InfoWithIcon } from './InfoWithIcon'
import s from './s.module.scss'

interface LikeAmountProps {
    likeAmount: number
    commentsAmount: number
}

export const PostInfo = (props: LikeAmountProps) => {
    const { likeAmount, commentsAmount } = props

    return (
        <div className={s.wrapper}>
            <InfoWithIcon
                text={likeAmount}
                icon='heart'
            />
            <InfoWithIcon
                text={commentsAmount}
                icon='comment'
            />
        </div>
    )
}
