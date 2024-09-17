import PlaceholderIcon from '@/shared/assets/dashboard-placeholder.png'
import Image from 'next/image'

import s from './s.module.scss'

export const Placeholder = () => {
    return (
        <span className={s.wrapper}>
            <div className={s.placeholder}>
                <Image
                    fill={true}
                    placeholder='blur'
                    src={PlaceholderIcon}
                    alt='Placeholder'
                />
            </div>
        </span>
    )
}
