'use client'

import Avatar from '@/shared/assets/user-avatar.png'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

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
    blurSrc?: string
}

export const UserAvatar = (props: UserAvatarProps) => {
    const {
        size = 'l',
        placeholder,
        onClick,
        fullHeight,
        href,
        word,
        className,
        blurSrc,
    } = props
    const [error, setError] = useState(false)

    const showAvatar = href && !error
    const showPlaceholder = placeholder && !href
    const showWord = (word && !error) || !href

    function getImageSize(sizes: typeof size) {
        return {
            s: '25px',
            m: '35px',
            l: '50px',
            xl: '100px',
        }[sizes]
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
                <ImageWithBlure
                    priority={true}
                    alt='User avatar'
                    fill={true}
                    sizes={getImageSize(size)}
                    src={href}
                    blurDataURL={blurSrc || href}
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
