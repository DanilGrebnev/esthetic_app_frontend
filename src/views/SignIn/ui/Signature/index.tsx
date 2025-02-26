import Link from 'next/link'

import s from './Signature.module.scss'

interface Signature {
    text: string
    href: string
    linkText: string
}

export const Signature = (props: Signature) => {
    const { linkText, href, text } = props
    return (
        <div className={s.signature}>
            <span>{text}</span> <Link href={href}>{linkText}</Link>
        </div>
    )
}
