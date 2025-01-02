'use client'

import Image from 'next/image'
import { forwardRef, memo, useState } from 'react'

type ImageWithBlureProps = Parameters<typeof Image>[0] & {
    blurDataURL: string
}

export const ImageWithBlure = memo(
    forwardRef<HTMLImageElement, ImageWithBlureProps>((props, ref) => {
        const [loading, setLoading] = useState(true)
        const [currentSrc, setCurrentSrc] = useState<string>(props.blurDataURL)

        return (
            <>
                <Image
                    ref={ref}
                    {...props}
                    alt={props.alt}
                    src={currentSrc}
                />

                {loading && (
                    <Image
                        ref={ref}
                        {...props}
                        alt={props.alt}
                        src={props.src}
                        onLoad={() => {
                            setCurrentSrc(props.src as string)
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
