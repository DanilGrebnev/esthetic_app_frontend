'use client'

import Avatar from '@/shared/assets/user-avatar.png'
import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import { clsx } from 'clsx'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

import s from './s.module.scss'

interface UserAvatarProps {
    word?: string
    size?: 'l' | 'm' | 's' | 'xl'
    className?: string
    placeholder?: boolean
    href?: string | null
    blurSrc?: string | null

    alt?: string
    onClick?: () => void
    fullHeight?: boolean
}

export const UserAvatar = memo((props: UserAvatarProps) => {
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
    const [errorFethImg, setErrorFethImg] = useState(false)

    const onError = useCallback(() => {
        setErrorFethImg(true)
    }, [])

    function getImageSize(sizes: typeof size) {
        return {
            s: '25px',
            m: '35px',
            l: '50px',
            xl: '100px',
        }[sizes]
    }

    const showAvatar = !errorFethImg && href
    /* Если ошибка загрузки фото или нет основной и второстепенной ссылки */
    const showWord = (word && !href) || errorFethImg
    /*Если нет ни главный ссылки, ни второстепенной и ошибка */
    const showAwatarPlaceholder = placeholder

    return (
        <div
            onClick={onClick}
            className={clsx(
                s.avatar,
                s[size],
                {
                    [s.placeholder]: showAwatarPlaceholder,
                    [s['full-height']]: fullHeight,
                },
                className,
            )}
        >
            {showAvatar && (
                <ImageWithBlure
                    className={s['avatar-img']}
                    priority={true}
                    alt='User avatar'
                    fill={true}
                    sizes={getImageSize(size)}
                    src={href}
                    blurDataURL={blurSrc || href}
                    onError={onError}
                />
            )}

            {showWord && word}

            {showAwatarPlaceholder && (
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
})

UserAvatar.displayName = 'UserAvatar'
