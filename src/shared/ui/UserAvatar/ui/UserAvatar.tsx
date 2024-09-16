'use client'

import Avatar from '@/shared/assets/user-avatar.png'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FC, useState } from 'react'

import s from './s.module.scss'

interface UserAvatarProps {
    word?: string
    size?: 'l' | 'm' | 's' | 'xl'
    className?: string
    placeholder?: boolean
    href?: string | null
    alt?: string
    onClick?: () => void
    fullHeight?: boolean
}

export const UserAvatar: FC<UserAvatarProps> = (props) => {
    const {
        size = 'l',
        placeholder,
        onClick,
        fullHeight,
        href,
        word,
        className,
    } = props
    const [error, setError] = useState(false)

    const showAvatar = !!href && !error
    const showPlaceholder = placeholder
    const showWord = (word && !error) || !href

    function getImageSize(sizes: typeof size) {
        switch (sizes) {
            case 's':
                return '25px'
            case 'm':
                return '35px'
            case 'l':
                return '50px'
            case 'xl':
                return '100px'
        }
    }

    return (
        <div
            onClick={onClick}
            className={clsx(
                s.avatar,
                s[size],
                {
                    [s.placeholder]: showPlaceholder,
                    [s['full-height']]: fullHeight,
                },
                className,
            )}
        >
            {showAvatar && (
                <Image
                    fill
                    priority={true}
                    alt='User avatar'
                    style={{ objectFit: 'cover' }}
                    sizes={getImageSize(size)}
                    src={href}
                    onError={() => setError(true)}
                />
            )}

            {showWord && word}

            {showPlaceholder && (
                <Image
                    fill
                    sizes={getImageSize(size)}
                    priority={true}
                    placeholder='blur'
                    src={Avatar}
                    alt='Profile avatar placeholder'
                />
            )}
        </div>
    )
}
