import { routes } from '@/shared/routes'
import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'

export default function UserLayout({ children }: Layout) {
    return (
        <div id='User layout'>
            <Button
                href={routes.main.getRoute()}
                variant='standart'
            >
                На главную
            </Button>
            {children}
        </div>
    )
}
