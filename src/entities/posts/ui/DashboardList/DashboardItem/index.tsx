import { consts } from '@/shared/consts'
import clsx from 'clsx'
import Image from 'next/image'

import s from './s.module.scss'

export const DashboardItem = () => {
    return (
        <div className={clsx(s['dashboar-item'], 'text-ellipsis')}>
            <Image
                className={s['dashboar-item__img']}
                src={consts.pathToImage + 't1.jpg'}
                width={40}
                height={40}
                alt='test'
            />
            <p>Профиль</p>
        </div>
    )
}
