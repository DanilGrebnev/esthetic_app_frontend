'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { type ITilesInfo } from '../../model/tyles-types'
import { TilesInfo } from '../TilesInfo/TilesInfo'
import { FavoritesTileImageRender } from './FavoritesTileImageRender'
import s from './favorites-tile.module.scss'

interface FavoritesTile extends ITilesInfo {
    images: string[] | []
    href: string
    skeleton?: boolean
}

export const FavoritesTile = (props: FavoritesTile) => {
    const { className, images, href, skeleton = false, ...other } = props

    const [cardWidth, setCardWidth] = useState<number>(0)
    const [cardWrapperWidth, setCardWrapperWidth] = useState<number>(0)
    const router = useRouter()

    const _cardsAmount = 5
    const cardRef = useRef<HTMLDivElement>(null)
    const cardWrapperRef = useRef<HTMLDivElement | null>(null)

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
            className={clsx(s.favorites_tile, className)}
        >
            <div
                ref={cardWrapperRef}
                className={s['all-posts__images-wrapper']}
            >
                <FavoritesTileImageRender
                    _cardsAmount={_cardsAmount}
                    images={images}
                    skeleton={skeleton}
                    cardRef={cardRef}
                    left={(i) => calculateLeftIndentation(_cardsAmount, i)}
                />
            </div>
            <TilesInfo {...other} />
        </div>
    )
}
