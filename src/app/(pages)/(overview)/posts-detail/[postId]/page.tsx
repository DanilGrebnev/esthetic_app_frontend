'use client'

import { DownloadFileBtn, SavePostsButton } from '@/entities/posts'
import {
    CommentariesItem,
    CommentariesWriteField,
} from '@/features/commentaries'
import { consts } from '@/shared/consts'
import { Container } from '@/shared/ui/Container'
import Image from 'next/image'

import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: number
    }
}

export default function DetailPosts({ params }: DetailPostsParams) {
    const pathToImg = consts.pathToImage + 't1.jpg'

    return (
        <Container
            size='m'
            className={s.page}
        >
            <article className={s['posts-detail__wrapper']}>
                <div className={s['media-wrapper']}>
                    <Image
                        fill={true}
                        src={pathToImg}
                        alt='test'
                    />
                </div>

                <div className={s['posts-content']}>
                    <header className={s['posts-content__header']}>
                        <div className={s['header__btn-group']}>
                            <DownloadFileBtn
                                href={pathToImg}
                                downloadFileName={'test'}
                            />
                            <SavePostsButton className={s['save-btn']} />
                        </div>

                        <div className={s['header__posts-info']}>
                            <h2 className={s['posts-info__title']}>
                                BMW M5 Compitition
                            </h2>
                            <p className={s['posts-info__description']}>
                                Описание к BMW M5 Compitition
                            </p>
                        </div>
                    </header>

                    <div className={s['posts-content__comments']}>
                        <div className={s['comments__list']}>
                            {Array(8)
                                .fill('')
                                .map((_, i) => (
                                    <CommentariesItem key={i} />
                                ))}
                        </div>
                        <CommentariesWriteField
                            className={s['write-comment-block']}
                        />
                    </div>
                </div>
            </article>
            {/*<div className={s['sub-block']}>Блок с какой-то информацией</div>*/}
        </Container>
    )
}
