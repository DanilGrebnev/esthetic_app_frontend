import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'
import clsx from 'clsx'

import s from './s.module.scss'

interface DashboardTileImageRenderProps {
    images: string[] | []
    blureImages: string[] | []
}

export const DashboardTileImageRender = (
    props: DashboardTileImageRenderProps,
) => {
    const { images, blureImages } = props
    const a = Array(3).fill(null)

    return (
        <div className={s.render_container}>
            {a.map((_, i) => {
                const url = images[i]

                return (
                    <div
                        key={i}
                        className={clsx(s[`img-${i + 1}`], s.img)}
                    >
                        {url && (
                            <ImageWithBlure
                                alt='preview'
                                fill={true}
                                src={url}
                                quality={10}
                                placeholder='blur'
                                blurDataURL={blureImages[i]}
                                className={s.image}
                                sizes='200px'
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
