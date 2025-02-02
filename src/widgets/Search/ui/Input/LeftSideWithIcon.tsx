import SearchIcon from '@/shared/assets/search-icon.svg'

import s from './input.module.scss'

export const LeftSideWithIcon = () => {
    return (
        <div className={s.left_side}>
            <SearchIcon className={s.search_icon} />
        </div>
    )
}
