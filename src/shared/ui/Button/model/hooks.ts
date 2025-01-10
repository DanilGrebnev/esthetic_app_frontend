import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'

export const useClickWithHref = (
    onClick?: MouseEventHandler<HTMLButtonElement>,
    href?: string,
): MouseEventHandler<HTMLButtonElement> => {
    const router = useRouter()

    return (e) => {
        onClick?.(e)
        if (href) router.push(href)
    }
}
