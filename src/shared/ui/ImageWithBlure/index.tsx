'use client'

import Image from 'next/image'
import { forwardRef, memo, useState } from 'react'

type ImageWithBlureProps = Parameters<typeof Image>[0] & {
    blurDataURL?: string
}

export const ImageWithBlure = memo(
    forwardRef<HTMLImageElement, ImageWithBlureProps>((props, ref) => {
        const { alt, src, blurDataURL } = props
        const [loading, setLoading] = useState(true)
        const [currentSrc, setCurrentSrc] = useState<string>(
            blurDataURL as string,
        )

        return (
            <>
                <Image
                    ref={ref}
                    {...props}
                    alt={alt}
                    src={currentSrc}
                />

                {loading && (
                    <Image
                        ref={ref}
                        {...props}
                        alt={alt}
                        src={src}
                        onLoad={() => {
                            setCurrentSrc(src as string)
                            setLoading(false)
                        }}
                        style={{
                            opacity: 0,
                            position: 'absolute',
                        }}
                    />
                )}
            </>
        )
    }),
)

ImageWithBlure.displayName = 'ImageWithBlure'
