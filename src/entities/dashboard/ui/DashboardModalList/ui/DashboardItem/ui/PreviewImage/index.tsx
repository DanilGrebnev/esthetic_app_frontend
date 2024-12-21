import { ImageWithBlure } from '@/shared/ui/ImageWithBlure'

import s from './s.module.scss'

interface IPreviewImage {
    url: string
    urlBlur: string
    alt: string
}

export const PreviewImage = (props: IPreviewImage) => {
    const { url, urlBlur, alt } = props

    return (
        <ImageWithBlure
            className={s['preview-image']}
            src={url}
            blurDataURL={urlBlur}
            width={40}
            height={40}
            alt={alt}
        />
    )
}
