import { consts } from '@/shared/consts'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import s from './s.module.scss'

interface DashboardItemProps {
    name: string
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const { name } = props
    return (
        <div className={clsx(s['dashboar-item'], 'text-ellipsis')}>
            <Image
                className={s['dashboar-item__img']}
                src={consts.pathToImage + 't1.jpg'}
                width={40}
                height={40}
                alt='test'
            />
            <p>{name}</p>
        </div>
    )
}
