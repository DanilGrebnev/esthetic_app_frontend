import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { DotMenu } from '@/shared/ui/DotMenu'
import { TilesDialog } from '@/shared/ui/Tiles/TilesInfo/TilesDialog'
import { stopPropAndPrevDef } from '@/shared/utils/stopPropAndPrevDef'
import clsx from 'clsx'
import { type FC, useState } from 'react'

import { ITilesInfo } from '../tyles-types'
import s from './s.module.scss'

interface TilesInfo extends ITilesInfo {
    className?: string
    dotMenu?: boolean
}

export const TilesInfo: FC<TilesInfo> = (props) => {
    const { className, date, title, postsCount, dotMenu = false } = props
    const [openDialog, setOpenDialog] = useState(false)

    const { elementRef } = useOutsideClick({
        handler: () => setOpenDialog(false),
        attached: openDialog,
    })

    return (
        <div className={clsx(s['tiles-info'], className)}>
            <header className={s.header}>
                <h5
                    title={title}
                    className={s.title}
                >
                    {title}
                </h5>
                {dotMenu && (
                    <DotMenu
                        onClick={stopPropAndPrevDef(() => {
                            setOpenDialog((p) => !p)
                        })}
                        className={s['dot-menu']}
                    />
                )}
            </header>
            <div className={s.footer}>
                <p className={s.count}>{postsCount} пин</p>
                <p className={s.date}>{date} нед.</p>
            </div>
            {openDialog && <TilesDialog ref={elementRef} />}
        </div>
    )
}
