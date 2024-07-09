import clsx from 'clsx'
import { type FC } from 'react'

import { LeftSideWithIcon } from './LeftSideWithIcon'
import s from './s.module.sass'

interface SearchInputProps {
    className?: string
}

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
    return (
        <div
            className={clsx(
                'flex w-fit overflow-hidden rounded-l-[20px] rounded-r-[--global-border-radius]',
                className,
            )}
        >
            <LeftSideWithIcon className={s.input} />
            <input
                placeholder='Поиск'
                className={clsx(
                    'h-[48px] w-[200px] pr-[10px] outline-none duration-300 ease-in-out focus:w-[500px]',
                    s.input,
                )}
            />
        </div>
    )
}
