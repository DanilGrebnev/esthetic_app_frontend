import { TPostsCard } from '@/shared/types/posts'
import { getRandomElementFromArray as ran } from '@/shared/utils/getRandomElementFromArr'
import { nanoid } from 'nanoid'

const port = process.env.NEXT_PUBLIC_PORT
const path = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTNAME}${port ? ':' + port : ''}/assets/`

const t1 = `${path}t1.jpg`
const t2 = `${path}t2.jpg`
const t3 = `${path}t3.jpg`
const t4 = `${path}t4.jpg`
const t5 = `${path}t5.jpg`
const t6 = `${path}t6.jpg`
const t7 = `${path}t7.jpg`
const t8 = `${path}t8.jpg`
const t9 = `${path}t9.jpg`
const t10 = `${path}t10.jpg`

const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']
const imgs = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10] as any as string[]

export const mockPosts = Array(250)
    .fill('')
    .map(() => {
        const aspectRatio = ran(asp) as any
        const postId = nanoid()

        const o: TPostsCard = {
            url: ran(imgs),
            contentType: '',
            options: { aspectRatio, objectPosition: 'top' },
            postId,
        }

        return o
    })
