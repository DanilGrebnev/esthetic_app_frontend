import { Box } from '@/shared/ui/Box'
import clsx from 'clsx'

import s from './s.module.scss'

type TData = any[]

interface SearchPostsDropDownProps<T extends TData> {
    mode: 'horizontal' | 'vertical'
    title?: string
    data: T
    children?: (data: T[number], i: number) => JSX.Element
    className?: string
}
/**
 * Принимает теги и отрисовывает их в горизонтальном или вертикальном режиме
 */
export const SearchPostsDropDown = <T extends TData>(
    props: SearchPostsDropDownProps<T>,
) => {
    const { mode, className, children, data = [], title } = props

    return (
        <Box className={clsx(s.box, s[mode], className)}>
            {title && <p>{title}</p>}
            <div className={clsx(s.container, 'scrollbar')}>
                {data?.map((item, i) => children?.(item, i))}
            </div>
        </Box>
    )
}
