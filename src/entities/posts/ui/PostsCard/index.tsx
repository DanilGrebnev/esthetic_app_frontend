import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import { CardCircleIcon } from '../CardCircleIcon'
import { SavePostsButton } from '../SavePostsButton'
import s from './s.module.sass'

interface PostCardProps {
    url: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url } = props

    return (
        <div
            className={clsx(
                s.card,
                'relative h-[419px] w-[236px] cursor-pointer overflow-hidden rounded-[20px]',
            )}
        >
            <div
                className={clsx(
                    s['button-group'],
                    'absolute z-[1] h-full w-full',
                )}
            >
                <SavePostsButton />
                <CardCircleIcon
                    variant='download'
                    className='absolute bottom-[10px] right-[10px]'
                />
            </div>

            <Image loading='lazy' alt='test' src={url} fill={true} />
        </div>
    )
}
