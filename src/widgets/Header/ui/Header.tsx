'use client'

import { SearchInput } from '@/entities/posts'
import { UserProfileIcon } from '@/entities/user'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import clsx from 'clsx'
import { useState } from 'react'

import { MobileToggleSearchBtn } from './MobileToggleSearchBtn'
import { NavigationGroup } from './NavigationGroup'
import s from './s.module.scss'

export const Header = () => {
    const [openSearch, setOpenSearch] = useState(false)

    const { elementRef } = useOutsideClick({
        attached: openSearch,
        handler: () => setOpenSearch(false),
    })

    return (
        <header className={clsx(s.header, { [s.open]: openSearch })}>
            <NavigationGroup className={s.nav_group} />
            <SearchInput
                ref={elementRef}
                className={s.search}
            />
            <MobileToggleSearchBtn
                onClick={() => setOpenSearch(true)}
                className={s.mobie_btn}
            />
            <div className={s.user_bar}>
                <UserProfileIcon />
            </div>
        </header>
    )
}
