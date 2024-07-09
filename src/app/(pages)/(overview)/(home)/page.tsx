import { PostsList } from '@/entities/posts'

export default function Home() {
    return (
        <div className='flex gap-[--global-gap]'>
            <PostsList />
        </div>
    )
}
