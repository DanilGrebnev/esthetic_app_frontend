import { InfoWithIcon } from './InfoWithIcon'

interface LikeAmountProps {
    likeAmount: number
    commentsAmount: number
}

export const PostInfo = (props: LikeAmountProps) => {
    const { likeAmount, commentsAmount } = props

    return (
        <div className='flex mx-auto gap-[--global-gap-1]'>
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
