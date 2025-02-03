import { Box } from '@/shared/ui/Box'
import clsx from 'clsx'

import s from './s.module.scss'

type TData = any[]

interface SearchPostsDropDownProps<T extends TData> {
    mode: 'horizontal' | 'vertical'
    title?: string
    data: T
    hiddenIfEmptyData?: boolean
    children?: (data: T[number], i: number) => JSX.Element
    className?: string
}
/**
 * Принимает теги и отрисовывает их в горизонтальном или вертикальном режиме
 */
export const BaseDropDown = <T extends TData>(
    props: SearchPostsDropDownProps<T>,
) => {
    const {
        mode,
        hiddenIfEmptyData,
        className,
        children,
        data = [],
        title,
        
    } = props

    if (hiddenIfEmptyData) {
        if (!data.length) return
    }

    return (
        <Box className={clsx(s.box, s[mode], className)}>
            {title && <p>{title}</p>}
            <div className={clsx(s.container, 'scrollbar')}>
                {data?.map((item, i) => children?.(item, i))}
            </div>
        </Box>
    )
}
