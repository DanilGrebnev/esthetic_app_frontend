import t1 from '@/shared/assets/t1.jpg'
import t2 from '@/shared/assets/t2.jpg'
import t3 from '@/shared/assets/t3.jpg'
import t4 from '@/shared/assets/t4.jpg'
import t5 from '@/shared/assets/t5.jpg'

import { PostsCard } from '../PostsCard'

const a = [t1, t2, t3, t4, t5] as any as string[]

export const PostsList = () => {
    return a.map((src, i) => <PostsCard url={src} key={i} />)
}
