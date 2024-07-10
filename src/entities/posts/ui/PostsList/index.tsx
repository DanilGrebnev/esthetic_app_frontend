import { mock } from '../../mock'
import { PostsCard } from '../PostsCard'
import s from './s.module.sass'

export const PostsList = () => {
    return (
        <div className={s.list}>
            {mock.map(({ url, aspect }, i) => (
                <PostsCard
                    className={s.card}
                    url={url}
                    aspect={aspect}
                    key={i}
                />
            ))}
        </div>
    )
}
