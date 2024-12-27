import { type Layout } from '@/shared/types/layout'
import { Header } from '@/widgets/Header'
import clsx from 'clsx'

import s from './s.module.scss'

const OverviewLayout = ({ children }: Layout) => {
    return (
        <section className={clsx('App', s.overview)}>
            <Header />
            <main className={s.main}>{children}</main>
        </section>
    )
}

export default OverviewLayout
