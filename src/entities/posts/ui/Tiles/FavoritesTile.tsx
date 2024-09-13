'use client'

import { TilesInfo } from '@/entities/posts/ui/Tiles/TilesInfo'
import { type ITilesInfo } from '@/entities/posts/ui/Tiles/tyles-types'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState } from 'react'

import s from './tiles.module.scss'

interface FavoritesTile extends ITilesInfo {
    images: string[] | []
    href: string
}

export const FavoritesTile: FC<FavoritesTile> = (props) => {
    const { className, images, href, ...other } = props

    const [cardWidth, setCardWidth] = useState<number>(0)
    const [cardWrapperWidth, setCardWrapperWidth] = useState<number>(0)
    const router = useRouter()

    const _cardsAmount = 5
    const cardRef = useRef<HTMLDivElement>(null)
    const cardWrapperRef = useRef<HTMLDivElement>(null)

    const onClick = () => {
        router.push(href)
    }

    useEffect(() => {
        const card = cardRef?.current
        const cardWrap = cardWrapperRef?.current

        if (!card || !cardWrap) return
        setCardWidth(card?.offsetWidth)
        setCardWrapperWidth(cardWrap?.offsetWidth)
    }, [])

    function calculateLeftIndentation(cardAmount: number, cardNumber: number) {
        // Пустое пространство от левой части до края карты, вплотную прилегающей
        // к правому краю контейнера
        const freeSpaceOnTheLeft = cardWrapperWidth - cardWidth
        // Рассчитываем шаг, на который мы будем отступать от левого края
        const step = freeSpaceOnTheLeft / (cardAmount - 1)
        // Рассчитываем отступ от левого края для каждой карты по её номеру
        return step * cardNumber
    }

    return (
        <div
            onClick={onClick}
            className={clsx(s['all-posts-tile'], className)}
        >
            <div
                ref={cardWrapperRef}
                className={s['all-posts__images-wrapper']}
            >
                {Array(_cardsAmount)
                    .fill('')
                    .map((_, i) => {
                        const imgUrl = images[i]

                        return (
                            <div
                                key={i}
                                ref={i === 0 ? cardRef : undefined}
                                className={clsx(
                                    s['all-posts__img-' + i],
                                    s['all-posts__img'],
                                )}
                                style={{
                                    zIndex: _cardsAmount - (i + 1),
                                    left: calculateLeftIndentation(
                                        _cardsAmount,
                                        i,
                                    ),
                                }}
                            >
                                {imgUrl && (
                                    <Image
                                        fill={true}
                                        src={imgUrl}
                                        alt='preview'
                                    />
                                )}
                            </div>
                        )
                    })}
            </div>
            <TilesInfo {...other} />
        </div>
    )
}
