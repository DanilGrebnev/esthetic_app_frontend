import Link from 'next/link'
import { FC } from 'react'

import s from './Signature.module.scss'

interface Signature {
    text: string
    href: string
    linkText: string
}

export const Signature: FC<Signature> = (props) => {
    const { linkText, href, text } = props
    return (
        <div className={s.signature}>
            <span>{text}</span> <Link href={href}>{linkText}</Link>
        </div>
    )
}
