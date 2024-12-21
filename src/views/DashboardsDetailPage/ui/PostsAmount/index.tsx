interface PostsAmountProps {
    postsAmount?: number
}

export const PostsAmount = (props: PostsAmountProps) => {
    const { postsAmount } = props

    const text = postsAmount ? 'Количество постов:' : 'В доске нет постов'

    return <h4>{text + ' ' + postsAmount}</h4>
}
