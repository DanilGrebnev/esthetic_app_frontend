'use client'

import Image from 'next/image'
import { RefObject } from 'react'

import { Component } from '../Component'
import s from './favorites-tile-image-render.module.scss'

interface FavoritesTileImageRenderProps {
    skeleton: boolean
    images: string[] | []
    cardRef: RefObject<HTMLDivElement | null>
    left: (i: number) => number
    _cardsAmount: number
}

export const FavoritesTileImageRender = (
    props: FavoritesTileImageRenderProps,
) => {
    const { _cardsAmount, images, skeleton, left, cardRef } = props

    return (
        <div className={s.render_container}>
            {Array(_cardsAmount)
                .fill('')
                .map((_, i) => {
                    const imgUrl = images[i]

                    return (
                        <Component
                            key={i}
                            skeleton={skeleton}
                            ref={i === 0 ? cardRef : undefined}
                            className={s.favorites_tile__img}
                            style={{
                                zIndex: _cardsAmount - (i + 1),
                                left: left(i),
                            }}
                        >
                            {imgUrl && (
                                <Image
                                    fill={true}
                                    src={imgUrl}
                                    alt='preview'
                                    sizes='100px'
                                />
                            )}
                        </Component>
                    )
                })}
        </div>
    )
}
