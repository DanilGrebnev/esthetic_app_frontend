import { type Layout } from '@/shared/types/layout'
import { Header } from '@/widgets/Header'
import { type FC } from 'react'

const OverviewLayout: FC<Layout> = ({ children }) => {
    return (
        <section className='App flex min-h-screen flex-col justify-between'>
            <Header />
            <main className='flex grow flex-col'>{children}</main>
        </section>
    )
}

export default OverviewLayout
