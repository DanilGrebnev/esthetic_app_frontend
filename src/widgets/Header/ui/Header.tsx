import { SearchInput } from '@/entities/posts'
import { UserProfileIcon } from '@/features/user'

import { LeftNavigationGroup } from './LeftNavigationGroup'
import s from './s.module.sass'

export const Header = () => {
    return (
        <header className={s.header}>
            <LeftNavigationGroup />
            <SearchInput />
            <div className={s['user-bar']}>
                <UserProfileIcon />
            </div>
        </header>
    )
}
